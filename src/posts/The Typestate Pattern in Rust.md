---
title: The Typestate Pattern in Rust
source: https://cliffle.com/blog/rust-typestate/
author:
  - Cliff L. Biffle
published: 
created: 2025-05-26
description: 
tags:
  - clippings
---
The *typestate pattern* is an API design pattern that encodes information about an object’s run-time *state* in its compile-time *type*. In particular, an API using the typestate pattern will have:

1. ====Operations on an object (such as methods or functions) that are only available when the object is in certain states,====
2. ====A way of encoding these states at the type level, such that attempts to use the operations in the wrong state fail to compile,====
3. State transition operations (methods or functions) that *change* the type-level state of objects in addition to, or instead of, changing run-time dynamic state, such that the operations in the previous state are no longer possible.

This is useful because:

- It moves certain types of errors from run-time to compile-time, giving programmers faster feedback.
- It interacts nicely with IDEs, which can avoid suggesting operations that are illegal in a certain state.
- It can eliminate run-time checks, making code faster/smaller.

This pattern is so easy in Rust that it’s almost *obvious*, to the point that you may have already written code that uses it, perhaps without realizing it. Interestingly, it’s *very difficult to implement* in most other programming languages — most of them fail to satisfy items number 2 and/or 3 above.

I haven’t seen a detailed examination of the nuances of this pattern, so here’s my contribution.

## What are typestates?

[Typestates](https://en.wikipedia.org/wiki/Typestate_analysis) are a technique for moving properties of *state* (the dynamic information a program is processing) into the *type* level (the static world that the compiler can check ahead-of-time).

Typestates are a broader topic than the specific pattern I’ll discuss here, which is why I’m calling it the “typestate *pattern*.”

The special case of typestates that interests us here is the way they can enforce run-time *order of operations* at compile-time. Here are some examples of properties that can be enforced by the typestate pattern in Rust (I assert — I don’t have implementations of all of them):

- “The buffer can only be translated if you have checked that it’s valid UTF-8.”
- “You must not perform any I/O operations on a file handle after it’s been closed.”
- “These messages can only be sent to the client after authentication has succeeded, and not after we have ended the session.”
- “Once you have done action A, you must perform either B or C (but not both) before you can do D.”

In most other languages, we would have to handle these with runtime checks and errors/exceptions. Or, we might get lazy and not check them at all, instead mentioning them in the documentation and hoping people read it!

With the typestate pattern, we can prevent code that breaks these rules from compiling, helping programmers find mistakes earlier and eliminating the overhead of run-time checks.

## A simple example: the living and the dead

There’s a common pattern in Rust libraries that allows an API to have two states, “living” and “dead.” Or, to put things concretely, [`std::fs::File`](https://doc.rust-lang.org/std/fs/struct.File.html) from the standard library has two states: “open” and “closed.” If you have access to a `File`, it’s open: the only way to obtain one <sup><a href="https://cliffle.com/blog/rust-typestate/#safety">1</a></sup> is from the `open` operation:

```rust
// At this point, we do not yet have access to a File.

// Open one:

let file = std::fs::File::open("myfile.txt")?;

// Here, we have access to \`file\`, and it's open. If opening had

// failed, we would have gotten an error.
```

<sup>1</sup>

In every case, when I say something like “the only way to X,” there’s an implicit caveat: “using safe code.” Using *unsafe* code it is possible to violate any invariant in the language, if you work hard enough at it! All guarantees discussed here are in terms of safe code.

We can close a file by letting it go out of scope, but for the sake of this discussion, let’s explicitly give up access using `drop`:

```rust
drop(file);

// Trying to use the file after close is a compile error:

// file.read_to_string(&mut buffer);  <-- DOES NOT COMPILE
```

This works because of the signature of `drop`:

```rust
pub fn drop<T>(value: T);
```

That is, `drop` takes its argument *by value,* not by reference (`&T`). This means the argument gets *moved into* the `drop` function, and the caller loses access to it.

This is an example of the typestate pattern, enforcing the property “you may not perform other operations on a `File` after closing it.”

This might look like [RAII](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization) to you, and you’re right. In Rust, most cases of the RAII pattern are also applications of the two-state typestate pattern. For instance, `Box` maintains two properties of the pointer it contains:

1. Only one `Box` may point to a given heap-allocated chunk at any given time.
2. Once the heap-allocated chunk has been deallocated, no `Box` es may point to it.

But compared to RAII in other languages, particularly C++, there’s a crucial difference: when we change states, *the object in the previous state,* whether an open file or a smart pointer, *can no longer be used.* This is because Rust’s notion of “moving” a value causes the previous owner to lose access to the value, while in most other languages, this is not true.

## Aside: why this doesn’t work well in other languages

Here’s a simple RAII-as-typestate example in Rust, using `Box`. We’ll try to use a `Box` after it’s been moved, which will fail to compile:

```rust
fn take_box_by_value(value: Box<i32>) {
    // Do nothing; value will be deallocated when it's dropped

}

fn main() {
    // Allocate an int on the heap.

    let ptr = Box::new(42);
    // Transfer it, by move, into a function.

    take_box_by_value(ptr);

    // Dereference it.

    println!("{}", *ptr); // <-- Compile error: value moved

                          // (this is good)

}
```

Here’s an equivalent example in C++. (I’m picking on C++ because it’s so similar to Rust.) This example does *not* work, which is to say, it *compiles:*

```c++
static int take_unique_ptr_by_value(std::unique_ptr<int> value) {
    // Do nothing; value will be deallocated when its dtor runs

}

int main(int argc, char *argv[]) {
    // Allocate an int on the heap.

    auto ptr = std::make_unique<int>(42);
    // Transfer it, by move, into a function.

    // Move semantics are not the default in C++, so we use std::move.

    take_unique_ptr_by_value(std::move(ptr));
    // Dereference it.

    std::cout << *ptr << std::endl;
}
```

This program compiles without so much as a warning on GCC 7 `-Wall`, because what it’s doing here is technically legal. Moving a value in C++ does not affect our ability to access the original. In fact, C++ even defines what `ptr` contains after we move it: it’s now `nullptr`. So this is a “valid” program that crashes without printing anything <sup><a href="https://cliffle.com/blog/rust-typestate/#nullptr">2</a></sup>.

<sup>2</sup>

Okay, technically, dereferencing `nullptr` is undefined behavior in C++. But in practice, unless you’re on an ancient version of Unix or a very obscure embedded system, it crashes the program.

A *move* in C++ is really a copy, but a special copy that can alter the original. Nothing prevents us from doing stuff with the original after the move; at best, it can throw an exception at runtime when we try. (At worst, it can ignore this problem and do undefined things.)

This difference in move semantics in the two languages is *subtle*, but this little difference is enough to make it difficult to implement a robust typestate pattern in C++. Few other languages even *have* move semantics (or mechanisms that can be used to do the same thing, like linear types), making the pattern much, much harder.

Going beyond RAII, we might want to have more than one “living” state for our object.

Here’s a motivating example. Let’s design an interface for generating an HTTP protocol response. We don’t need to get into the nitty-gritty of HTTP — for this discussion, all you need to know is that an HTTP response consists of:

1. Exactly one status line.
2. Zero or more headers.
3. An optional body.

We would like an API where this compiles:

```rust
fn a_simple_response(r: HttpResponse) {
    r.status_line(200, "OK")
      .header("X-Unexpected", "Spanish-Inquisition")
      .header("Content-Length", "6")
      .body("Hello!")
}
```

And this does not:

```rust
fn broken_response_1(r: HttpResponse) {
    r.header("X-Unexpected", "Spanish-Inquisition")
      // error: forgot to call status_line

}

fn broken_response_2(r: HttpResponse) {
    r.status_line(200, "OK")
      .body("Hello!")
      .header("X-Unexpected", "Spanish-Inquisition")
        // error: tried to send a header after body

}
```

(Notice that I’m using *method chaining*, i.e. `x.foo().bar()`. The reason will be apparent shortly.)

One way to do this is to model each state as a *separate type*:

- The `status_line` operation converts an `HttpResponse` into an `HttpResponseAfterStatus`.
- `header` leaves the type unchanged.
- `body` *consumes* a `HttpResponseAfterStatus`, returning `()`.

Concretely:

```rust
struct HttpResponse { ... }
struct HttpResponseAfterStatus { ... }

impl HttpResponse {
    fn status_line(self, code: u8, message: &str)
        -> HttpResponseAfterStatus
    {
        // ...body omitted

    }
}

impl HttpResponseAfterStatus {
    fn header(self, key: &str, value: &str) -> Self {
        // ...body omitted

    }

    fn body(self, text: &str) {
        // ...body omitted

    }
}
```

Notice that each operation *consumes* `self` and either produces a new object in a certain state, or (in the case of `body`) produces nothing, ending the process.

- We can’t send a header before the status line, because the operation simply isn’t defined.
- We can’t send a status line after the header, because, likewise, it isn’t defined on the type.
- We can’t do *anything* after sending the body, because the object is taken away from us.

That’s a decent interface. Let’s consider the implementation.

Because `self` (the `HttpResponse` or `HttpResponseAfterStatus`) gets consumed and recreated at every step, it needs to be cheap, which is to say, fairly small. An easy technique is to make both types simple wrappers for a smart pointer to the actual state, which stays the same in all type-states:

```rust
struct HttpResponse(Box<ActualResponseState>);
struct HttpResponseAfterStatus(Box<ActualResponseState>);

struct ActualResponseState { ... }
```

This API is okay, but it will be awkward if we want to generate headers in a loop, because we have to keep replacing the consumed `self` value:

```rust
fn many_headers(r: HttpResponse, headers: Vec<Header>) {
    let mut r = r.status_line(200, "OK");
    for h in headers {
        // Having to do this is kind of annoying:

        r = r.header(h.key, h.value);
        // Fortunately, if you forget the \`r =\` part,

        // the compile will fail.

    }
    r.body("hello!")
}
```

To make this more pleasant, operations that don’t change the typestate are often defined as taking `&self` or `&mut self`.

```rust
// Let's try this again:

impl HttpResponseAfterStatus {
    fn header(&mut self, key: &str, value: &str) {
        // ...

    }
}

fn many_headers(r: HttpResponse, headers: Vec<Header>) {
    let mut r = r.status_line(200, "OK");
    for h in headers {
        // Ahhhh, much better.

        r.header(h.key, h.value);
    }
    r.body("hello!")
}
```

Optionally (not shown above), you can also have the operation *return* the reference to self, which lets the user choose whether or not to use method chaining.

## Typestate in the wild: serde

There are several examples of the typestate pattern in widespread use in the Rust ecosystem. The highest-profile one that I’m aware of is `serde`: the [`Serializer`](https://docs.serde.rs/serde/ser/trait.Serializer.html) models a fairly complex state machine using typestates. For instance,

- Starting with a `Serializer`,
- The `serialize_struct` operation consumes it and produces an object that implements the [`SerializeStruct`](https://docs.serde.rs/serde/ser/trait.SerializeStruct.html) trait.
- You can call the `serialize_field` and/or `skip_field` methods zero or more times.
- The `end` method consumes the `SerializeStruct` and produces a result.

You cannot accidentally call `serialize_struct` twice, or call both `serialize_struct` and `serialize_i32`, or add fields to the struct after calling `end`. You cannot serialize two values where one was expected. Attempting any of these will produce a compile error.

`Serializer` is a trait that third-parties will implement to define new data formats. Because the trait is specified using the typestate pattern, *it’s basically impossible for an implementation to misbehave using safe code,* except for randomly panicking. I suspect this robustness is part of the reason for `serde` ’s success.

## Variation: state type parameter

Instead of having a *separate* struct for each state, we can model state as a type *parameter* for a single generic struct. This is often less boilerplatey and more powerful than having entirely separate types, but it’s also harder to explain, which is why I didn’t cover it first.

Consider the HTTP response example again. Here’s how we might model it using a state type parameter:

```rust
// S is the state parameter. We require it to impl

// our ResponseState trait (below) to prevent users

// from trying weird types like HttpResponse<u8>.

struct HttpResponse<S: ResponseState> {
    // This is the same field as in the previous example.

    state: Box<ActualResponseState>,
    // This reassures the compiler that the parameter

    // gets used.

    marker: std::marker::PhantomData<S>,
}

// State type options.

enum Start {} // expecting status line

enum Headers {} // expecting headers or body

trait ResponseState {}
impl ResponseState for Start {}
impl ResponseState for Headers {}
```

I’ll pause there, as there’s a lot going on.

Unlike generic types like `Vec<T>` that can be applied to almost any `T`, we expect the `HttpResponse<S>` type to be used with only two values of `S`:`HttpResponse<Start>` and `HttpResponse<Headers>`. (Technically, as written, the user could implement `ResponseState` for a custom type and try using it with `HttpResponse`. If that bothers you, you can use the [sealed trait pattern](https://rust-lang-nursery.github.io/api-guidelines/future-proofing.html#sealed-traits-protect-against-downstream-implementations-c-sealed) to fix it.)

`State` and `Headers` are types that exist only as types, and not as values; we’ve used the zero-variant enum pattern to ensure this. Types like this are broadly referred to as *phantom types*, which is where `std::marker::PhantomData` gets its name from.

Okay, let’s define some operations on `HttpResponse`.

```rust
/// Operations that are valid only in Start state.

impl HttpResponse<Start> {
    fn new() -> Self {
        // ...

    }

    fn status_line(self, code: u8, message: &str)
        -> HttpResponse<Headers>
    {
        // ...

    }
}

/// Operations that are valid only in Headers state.

impl HttpResponse<Headers> {
    fn header(&mut self, key: &str, value: &str) {
        // ...

    }

    fn body(self, contents: &str) {
        // ...

    }
}
```

So far this is equivalent to the original code, which didn’t use generics. Why is this more powerful, then?

State type parameters enable several interesting things:

1. It’s easy and concise to add operations that are valid in all states, or a subset of states.
2. All of these operations on the `HttpResponse` show up on the same generated `rustdoc` for `HttpResponse`, but under separate headings, one per impl block. You can attach doc comments to each impl block, as shown above, to help users follow along. In the previous example with one type per state, the methods are spread across multiple pages, making them harder to follow.

To add an operation that’s valid in any state, we simply leave `S` unconstrained:

```rust
/// These operations are available in any state.

impl<S> HttpResponse<S> {
    fn bytes_so_far(&self) -> usize { /* ... */ }
}
```

We only have two states in this example, but if we had more, we might want to add operations that are valid in *more than one* state, but not *all states*. To do this, we can use a trait to identify the states, and a constrained impl block to define the operations:

```rust
/// Trait implemented by states that are sending data.

trait SendingState {}
impl SendingState for Headers {}
// other states could go here

/// These operations are only available in states that

/// impl SendingState.

impl<S> HttpResponse<S>
    where S: SendingState
{
    fn spam_spam_spam(&mut self);
}
```

## Variation: state types that contain actual state

In the original version, when we were modeling each state with a totally separate type, we could easily add some fields to one struct and not the other, to store different information in different states. Now that we’re using a single generic struct in all states, it appears that we’ve lost this ability. But we can fix that.

In the most recent example above, the state types used as state type parameters were phantom types that couldn’t be instantiated at runtime. This is often useful, but doesn’t *have* to be the case. If the state types are concrete, we can store stuff inside them; by storing an `S` *inside* our common struct, we inherit its contents.

For example, we might want to track the status code that we sent back to the client in our HTTP response. We could use an `Option<u8>`, which would start out `None` and get set to `Some(code)` in `status_line`, but that’s not ideal for three reasons:

1. Any function, in any state, could try to access the code, even though it only makes sense to do so once the status line has been sent.
2. Any access to the code will have to deal with `None`, even though we *know* the field is set after the status line has been sent.
3. We’ll be allocating space for the code in all states, which is a waste. In this case, the field is small (one byte), but what if it’s large?

These issues go away if we put the state inside the state type used as a parameter:

```rust
// Similar to before:

struct HttpResponse<S: ResponseState> {
    // This is the same field as in the previous example.

    state: Box<ActualResponseState>,
    // Instead of PhantomData<S>, we store an actual copy.

    extra: S,
}

// State type options. These now can add fields to HttpResponse.

// Start adds no fields.

struct Start;

// Headers adds a field recording the response code we sent.

struct Headers {
    response_code: u8,
}

trait ResponseState {}
impl ResponseState for Start {}
impl ResponseState for Headers {}
```

Now, when we’re operating on an `HttpResponse<Start>`, we can’t try to access `response_code` — it simply isn’t there. This also means that in `Start` state, the response is one byte smaller than in `Headers`; that’s probably insigificant here, but can become useful if you need to store more state.

In the `Headers` state, though, we’re guaranteed to have `response_code` and we can access it directly.

```rust
impl HttpResponse<Start> {
    fn status_line(self, response_code: u8, message: &str)
        -> HttpResponse<Headers>
    {
        // Capture the response code in the new state.

        // In an actual HTTP implementation you'd

        // probably also want to send some data. ;-)

        HttpResponse {
            state: self.state,
            extra: Headers {
                response_code,
            },
        }
    }
}

impl HttpResponse<Headers> {
    fn response_code(&self) -> u8 {
        // Hey look, it's the response code

        self.extra.response_code
    }
}
```

I use this variant in my [m4vga](https://github.com/cbiffle/m4vga-rs) crate, which provides a video driver. The video driver can be in multiple states depending on how much you’ve set up, and it stores different amounts of information in each state.

## Conclusions

The typestate pattern is natural to use in Rust, and lets us design APIs that are easy to use correctly and impossible to use incorrectly. I’m sure there are more variations that I haven’t covered — I’d love to hear about them, drop me a line.

Also: I’d be interested in hearing about successful implementations of this pattern in languages other than Rust. At first glance, it seems to require a language with checked move semantics, but I bet you can find a way around that.
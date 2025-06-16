## JSON Schema

**Specification**: RFC-based standard (Draft 2020-12 is current) 
**Data Model**: Tree-structured JSON documents 
**Type System**:
- Primitive types: `null`, `boolean`, `object`, `array`, `number`, `string`, `integer`
- Complex validation via keywords like `pattern`, `format`, `enum`
- Conditional schemas with `if`/`then`/`else`
- Reference resolution via `$ref` and `$id`

**Key Features**:
- Meta-schema self-validation
- Vocabulary system for extensions
- Annotation collection during validation
- Output formats for validation results
- Support for recursive schemas via `$recursiveRef`

**Serialization**: JSON only 
**Validation**: Runtime validation with detailed error reporting 
**Tooling**: Extensive cross-language library support

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0 }
  },
  "required": ["name"]
}
```

## IPLD Schemas

**Specification**: IPLD specification with ADL (Advanced Data Layouts) support 
**Data Model**: IPLD Data Model with content-addressed linking 
**Type System**:
- Basic kinds: `null`, `bool`, `int`, `float`, `string`, `bytes`, `list`, `map`, `link`
- Advanced types: `struct`, `enum`, `union`, `copy`
- Keyed unions and inline unions
- Representation strategies (map, list, stringjoin, etc.)

**Key Features**:
- Content addressing via CIDs (Content Identifiers)
- Cross-codec compatibility (CBOR, DAG-CBOR, DAG-JSON)
- Advanced Data Layouts for complex structures
- Immutable, cryptographically verifiable data
- Path-based navigation and selection

**Serialization**: Multiple codecs (CBOR, DAG-CBOR, DAG-JSON, etc.) 
**Validation**: Compile-time type checking and runtime validation 
**Tooling**: Go, JavaScript implementations with code generation

```yaml
type Person struct {
  name String
  age optional Int
  friends [&Person]  # Links to other Person nodes
} representation map
```

## AT Protocol Lexicons

**Specification**: AT Protocol specification 
**Data Model**: Record-based with NSID (Namespaced Identifier) routing 
**Type System**:
- Primitives: `boolean`, `integer`, `string`, `bytes`, `cid-link`, `datetime`
- Complex: `object`, `array`, `blob`, `union`
- XRP (eXtensible Record Protocol) records
- Procedure definitions (query/procedure methods)

**Key Features**:
- NSID-based method and record type identification
- Built-in authentication and authorization concepts
- Blob handling with size/MIME type constraints
- Lexicon versioning and compatibility
- Integration with repository/commit structure

**Serialization**: CBOR for records, JSON for API calls 
**Validation**: Schema validation plus protocol-level constraints 
**Tooling**: TypeScript/JavaScript with automatic client generation

```json
{
  "lexicon": 1,
  "id": "com.example.profile",
  "defs": {
    "main": {
      "type": "record",
      "key": "literal:self",
      "record": {
        "type": "object",
        "required": ["displayName"],
        "properties": {
          "displayName": {"type": "string", "maxLength": 64},
          "avatar": {"type": "blob", "accept": ["image/*"]}
        }
      }
    }
  }
}
```

## Protocol Buffers

**Specification**: Google's protobuf specification 
**Data Model**: Message-based with field numbering 
**Type System**:

- Scalar: `double`, `float`, `int32`, `int64`, `uint32`, `uint64`, `sint32`, `sint64`, `fixed32`, `fixed64`, `sfixed32`, `sfixed64`, `bool`, `string`, `bytes`
- Complex: `message`, `enum`, `oneof`, `map`, `repeated`
- Well-known types (Timestamp, Duration, Any, etc.)

**Key Features**:

- Binary wire format with varint encoding
- Forward/backward compatibility via field numbers
- Code generation for multiple languages
- gRPC integration
- Reflection and dynamic message handling

**Serialization**: Binary protobuf format 
**Validation**: Compile-time type checking 
**Tooling**: Extensive multi-language support with code generation

```protobuf
syntax = "proto3";

message Person {
  string name = 1;
  int32 age = 2;
  repeated string email = 3;
}
```

## Apache Avro

**Specification**: Apache Avro specification 
**Data Model**: Schema evolution with reader/writer schemas 
**Type System**:

- Primitive: `null`, `boolean`, `int`, `long`, `float`, `double`, `bytes`, `string`
- Complex: `record`, `enum`, `array`, `map`, `union`, `fixed`
- Logical types: `decimal`, `uuid`, `date`, `time-millis`, etc.

**Key Features**:

- Schema evolution with compatibility rules (FULL, FORWARD, BACKWARD)
- Compact binary serialization without field tags
- Schema included in data files
- Dynamic typing support
- Integration with big data ecosystems (Kafka, Hadoop)

**Serialization**: Binary Avro format, JSON encoding available 
**Validation**: Schema matching and evolution validation 
**Tooling**: Java, C, C++, C#, Python, Ruby, PHP implementations

```json
{
  "type": "record",
  "name": "Person",
  "fields": [
    {"name": "name", "type": "string"},
    {"name": "age", "type": ["null", "int"], "default": null}
  ]
}
```

## Comparison Matrix

|Feature|JSON Schema|IPLD Schema|AT Lexicon|Protobuf|Avro|
|---|---|---|---|---|---|
|**Primary Use Case**|JSON validation|Decentralized data|Social protocol|RPC/Services|Data serialization|
|**Serialization**|JSON only|Multi-codec|CBOR/JSON|Binary|Binary/JSON|
|**Schema Evolution**|Limited|Immutable|Versioned|Field numbers|Full support|
|**Type Safety**|Runtime|Compile+Runtime|Runtime|Compile-time|Runtime|
|**Linking**|URI references|Content addressing|NSID routing|Import system|Schema registry|
|**Code Generation**|Limited|Yes|Yes|Extensive|Yes|
|**Ecosystem**|Web APIs|IPFS/Web3|Bluesky/AT|gRPC/Enterprise|Big Data|
|**Validation Complexity**|Very high|Medium|Medium|Low|Low|
|**Performance**|Slow|Fast|Medium|Very fast|Fast|

## Technical Trade-offs

**JSON Schema** excels at complex validation logic and documentation but has poor performance and limited type safety.

**IPLD Schemas** provide cryptographic integrity and cross-format compatibility but are complex to implement and have limited tooling.

**AT Protocol Lexicons** integrate authentication and social networking primitives but are domain-specific and have a smaller ecosystem.

**Protocol Buffers** offer excellent performance and tooling but require code generation and have limited runtime flexibility.

**Apache Avro** provides superior schema evolution but is primarily designed for batch processing scenarios and has complex compatibility rules.
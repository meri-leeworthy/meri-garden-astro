---
title: 'Keyhive'
slug: 'keyhive'
---

[https://www.inkandswitch.com/keyhive/](https://www.inkandswitch.com/keyhive/)

**published notes about it**
[[01 · Welcome to the Keyhive]]
[[Group Key Agreement with BeeKEM]]

**sub projects**
[[Beelay]] - sans IO sync state machine
[[BeeKEM]] - eventually consistent CGKA that's efficient for large groups

**my writing about it**
[[Using Keyhive in WASM to model capability groups]]


**Transitive permissions are modelled as a chain of delegations**
## Identity in Keyhive

As the current user the core type representing me is `Active`. Other principals are `Peer`: either `Document`, `Group`, or `Individual`. `Agent` is any of these.

Individual has
- id
- prekeys
- prekey_state

What do we do with prekeys? they are in ContactCards

At the end of the AddMember process you get a SignedDelegation

it contains signature
## Key types
[[Ed25519]] - signatures
[[X25519]] - encryption
- VerifyingKey - ed25519_dalek public key for verifying signatures
- SigningKey - corresponding private key

### ContactCard
I am working with this Rust struct ContactCard

```rust
use crate::{
    crypto::{share_key::ShareKey, verifiable::Verifiable},
    principal::individual::{id::IndividualId, op::KeyOp, Individual},
    util::hex,
};
use derive_more::{From, Into};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, From, Into, Hash, Serialize, Deserialize)]
#[cfg_attr(any(test, feature = "arbitrary"), derive(arbitrary::Arbitrary))]
pub struct ContactCard(pub(crate) KeyOp);

impl ContactCard {
    pub fn id(&self) -> IndividualId {
        self.0.issuer().into()
    }

    pub fn share_key(&self) -> &ShareKey {
        self.0.new_key()
    }

    pub fn op(&self) -> &KeyOp {
        &self.0
    }
}

impl std::fmt::Display for ContactCard {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "ContactCard for ",)?;
        hex::bytes_as_hex(self.0.issuer().as_bytes().iter(), f)
    }
}

impl From<&ContactCard> for Individual {
    fn from(contact_card: &ContactCard) -> Individual {
        Individual::new(contact_card.0.clone())
    }
}

impl From<ContactCard> for Individual {
    fn from(contact_card: ContactCard) -> Individual {
        Individual::new(contact_card.0)
    }
}

impl Verifiable for ContactCard {
    fn verifying_key(&self) -> ed25519_dalek::VerifyingKey {
        self.0.verifying_key()
    }
}
```

My goal here is to extend this, and the WASM bindings wrapping it, so I can export and import ContactCard to and from JSON. What I'm not clear about, I guess, is how 
---
title: '"Fork-Resilient Continuous Group Key Agreement"'
slug: 'fork-resilient-continuous-group-key-agreement'
source: '"https://link.springer.com/chapter/10.1007/978-3-031-38551-3_13"'
author:
- '"[[Joël Alwen]]"'
- '"[[Marta Mularczyk]]"'
- '"[[Yiannis Tselekounis]]"'
published: '2023-01-01'
created: '2025-07-03'
description: '"Continuous Group Key Agreement (CGKA) lets an evolving group of clients agree on a sequence of group keys. An important application of CGKA is scalable end-to-end (E2E) encrypted group messaging. A major problem preventing the use of CGKA over unreliable..."'
tags:
- '"clippings"'
---

[[2023-394.pdf]]
## Abstract

Continuous Group Key Agreement (CGKA) lets an evolving group of clients agree on a sequence of group keys. An important application of CGKA is scalable end-to-end (E2E) encrypted group messaging. A major problem preventing the use of CGKA over unreliable infrastructure are so-called forks. A *fork* occurs when group members have diverging views of the group’s history (and thus its current state); e.g. due to network or server failures. Once communication channels are restored, members *resolve* a fork by agreeing on the state of the group again. Today’s CGKA protocols make fork resolution challenging, as natural resolution strategies seem to conflict with the way the protocols enforce group state agreement and forward secrecy. Meanwhile, secure group messaging protocols which do support fork resolution do not scale nearly as well as CGKA does.

In this work, we pave the way to practical scalable E2E messaging over unreliable infrastructure. To that end, we generalize CGKA to *Fork Resilient* -CGKA which allows clients to process significantly more types of out-of-order network traffic. This is important for many natural fork resolution procedures as they are based, in part, on replaying missed traffic. Next, we give two FR-CGKA constructions: a practical one based on the CGKA underlying the MLS messaging standard and an optimally secure one (albeit with only theoretical efficiency). To further assist with fork resolution, we introduce a simple new abstraction to describe a client’s local protocol state. The abstraction describes all and only the information relevant to natural fork resolution, making it easier for higher-level fork resolution procedures to work with and reason about. We define a black-box extension of an FR-CGKA which maintains such a description of a client’s internal state. Finally, as a proof of concept, we give a basic fork resolution protocol.

Y. Tselekounis—Work done at CMU and partially supported by a Packard Fellowship, NSF awards #CNS-2128519, #CNS-2044679, ONR award #N000142212064, Algorand Foundation and JP Morgan Faculty Research Award.

This is a preview of subscription content, [log in via an institution](https://wayf.springernature.com/?redirect_uri=https%3A%2F%2Flink.springer.com%2Fchapter%2F10.1007%2F978-3-031-38551-3_13) to check access.

## Access this chapter

[Log in via an institution](https://wayf.springernature.com/?redirect_uri=https%3A%2F%2Flink.springer.com%2Fchapter%2F10.1007%2F978-3-031-38551-3_13)

Chapter

EUR 29.95

Price includes VAT (Australia)

eBook

EUR 96.29

Softcover Book

EUR 119.99

Tax calculation will be finalised at checkout

Purchases are for personal use only

[Institutional subscriptions](https://www.springernature.com/gp/librarians/licensing/agc/ebooks)

## Notes

1. 1.
	We note such delivery servers are not trusted for confidentiality, authenticity or agreement of the CGKA / messaging application. Instead, we rely on them only for availability. The agreement property ensures that for two clients to be in the same epoch (a prerequisite for exchanging E2E encrypted messages in a CGKA-based messaging protocol) the clients must first have the same view of the group state.
2. 2.
	Federated messaging is used widely in practice, especially in the enterprise and public sectors. \[[^25], [^28], [^33], [^34], [^42], [^44]\]. One reason is that by administering their own host servers, organizations can better manage their members’ clients. For example, organizations can better control incoming/outgoing communication flows by determining to which external host servers their own server can connect.
3. 3.
	Most protocols make it easy to recognize any causal dependencies of packets using sequence or epoch numbers so local buffering of packets delivered prior to causal dependencies effectively implements a causality respecting network from one with eventual delivery from a clients point of view.
4. 4.
	We also note that, unlike almost all other protocols in this work, the Matrix protocol has little to no forward secrecy, though we believe this could be fixed relatively easily; albeit at the likely cost to availability in the case of failure and device loss \[[^1]\].
5. 5.
	For the purpose of this overview, one can think of a simplified TreeKEM where each party has a PKE key pair. The sender encrypts a random commit secret to each party and generates a new PKE key pair for themselves.
6. 6.
	So e.g., all nodes have indegree 1 except the initial epoch’s node has indegree 0.
7. 7.
	We chose X.509 as a credential type as it’s one of two non-trivial credential types mentioned in MLS ’s RFC and Cisco’s WebEx—the only currently deployed instance of MLS we know of—uses X.509 certificates as credentials. As for the size we took 1 KB as just one X.509 SSL cert in the certificate chain of github.com is 4KB large.

## References

## Editor information

### Editors and Affiliations

## Rights and permissions

## About this paper

### Cite this paper

Alwen, J., Mularczyk, M., Tselekounis, Y. (2023). Fork-Resilient Continuous Group Key Agreement. In: Handschuh, H., Lysyanskaya, A. (eds) Advances in Cryptology – CRYPTO 2023. CRYPTO 2023. Lecture Notes in Computer Science, vol 14084. Springer, Cham. https://doi.org/10.1007/978-3-031-38551-3\_13

- [.RIS](https://citation-needed.springer.com/v2/references/10.1007/978-3-031-38551-3_13?format=refman&flavour=citation "Download this article's citation as a .RIS file")
- [.ENW](https://citation-needed.springer.com/v2/references/10.1007/978-3-031-38551-3_13?format=endnote&flavour=citation "Download this article's citation as a .ENW file")
- [.BIB](https://citation-needed.springer.com/v2/references/10.1007/978-3-031-38551-3_13?format=bibtex&flavour=citation "Download this article's citation as a .BIB file")
- DOI https://doi.org/10.1007/978-3-031-38551-3\_13
- Published
- Publisher Name Springer, Cham
- Print ISBN 978-3-031-38550-6
- Online ISBN 978-3-031-38551-3
- eBook Packages [Computer Science](https://link.springer.com/search?facet-content-type=%22Book%22&package=11645&facet-start-year=2023&facet-end-year=2023) [Computer Science (R0)](https://link.springer.com/search?facet-content-type=%22Book%22&package=43710&facet-start-year=2023&facet-end-year=2023)

## Publish with us

[Policies and ethics](https://www.springernature.com/gp/policies/book-publishing-policies)

- [![the International Association for Cryptologic Research](https://published-with.public.springernature.app/img/iacrlogo.jpg)
	the International Association for Cryptologic Research
	](https://iacr.org/)

[^1]: Albrecht, M.R., Celi, S., Dowling, B., Jones, D.: Practically-exploitable cryptographic vulnerabilities in matrix. In: 2023 2023 IEEE Symposium on Security and Privacy (SP) (SP), pp. 1419–1436, Los Alamitos, CA, USA, May 2023. IEEE Computer Society (2023)

[^2]: Alwen, J., et al.: Grafting key trees: efficient key management for overlapping groups. In: Nissim, K., Waters, B. (eds.) TCC 2021, Part III. LNCS, vol. 13044, pp. 222–253. Springer, Cham (2021). [https://doi.org/10.1007/978-3-030-90456-2\_8](https://doi.org/10.1007/978-3-030-90456-2_8)

[^3]: Alwen, J., Auerbach, B., Noval, M.C., Klein, K., Pascual-Perez, G., Pietrzak, K.: DeCAF: decentralizable continuous group key agreement with fast healing. Cryptology ePrint Archive, Report 2022/559 (2022). [https://eprint.iacr.org/2022/559](https://eprint.iacr.org/2022/559)

[^4]: Alwen, J., et al.: CoCoA: concurrent continuous group key agreement. In: Dunkelman, O., Dziembowski, S. (eds.) EUROCRYPT 2022, Part II. LNCS, vol. 13276, pp. 815–844. Springer, Heidelberg (2022). [https://doi.org/10.1007/978-3-031-07085-3\_28](https://doi.org/10.1007/978-3-031-07085-3_28)

[^5]: Alwen, J., Coretti, S., Dodis, Y., Tselekounis, Y.: Security analysis and improvements for the IETF MLS standard for group messaging. In: Micciancio, D., Ristenpart, T. (eds.) CRYPTO 2020, Part I. LNCS, vol. 12170, pp. 248–277. Springer, Cham (2020). [https://doi.org/10.1007/978-3-030-56784-2\_9](https://doi.org/10.1007/978-3-030-56784-2_9)

[^6]: Alwen, J., Coretti, S., Dodis, Y., Tselekounis, Y.: Modular design of secure group messaging protocols and the security of MLS. In: Vigna, G., Shi, E. (eds.) ACM CCS 2021, pp. 1463–1483. ACM Press, November 2021

[^7]: Alwen, J., Coretti, S., Jost, D., Mularczyk, M.: Continuous group key agreement with active security. In: Pass, R., Pietrzak, K. (eds.) TCC 2020, Part II. LNCS, vol. 12551, pp. 261–290. Springer, Cham (2020). [https://doi.org/10.1007/978-3-030-64378-2\_10](https://doi.org/10.1007/978-3-030-64378-2_10)

[^8]: Alwen, J., Hartmann, D., Kiltz, E., Mularczyk, M.: Server-aided continuous group key agreement. In: Yin, H., Stavrou, A., Cremers, C., Shi, E. (eds.) ACM CCS 2022, pp. 69–82. ACM Press, November 2022

[^9]: Alwen, J., Jost, D., Mularczyk, M.: On the insider security of MLS. In: Dodis, Y., Shrimpton, T. (eds.) CRYPTO 2022, Part II. LNCS, vol. 13508, pp. 34–68. Springer, Heidelberg (2022). [https://doi.org/10.1007/978-3-031-15979-4\_2](https://doi.org/10.1007/978-3-031-15979-4_2)

[^10]: Alwen, J., et al.: Keep the dirt: tainted treekem, an efficient and provably secure continuous group key agreement protocol. In: 42nd IEEE Symposium on Security and Privacy (2021). Full Version: [https://ia.cr/2019/1489](https://ia.cr/2019/1489)

[^11]: Alwen, J., Mularczyk, M., Tselekounis, Y.: Fork-resilient continuous group key agreement. Cryptology ePrint Archive, Paper 2023/394 (2023). [https://eprint.iacr.org/2023/394](https://eprint.iacr.org/2023/394)

[^12]: Automerge.org. Automerge (2023). [https://automerge.org/](https://automerge.org/)

[^13]: Balbás, D., Collins, D., Vaudenay, S.: Cryptographic administration for secure group messaging. Cryptology ePrint Archive, Report 2022/1411 (2022). [https://eprint.iacr.org/2022/1411](https://eprint.iacr.org/2022/1411)

[^14]: Barnes, R., Beurdouche, B., Robert, R., Millican, J., Omara, E., Cohn-Gordon, K.: The messaging layer security (MLS) protocol. Internet-Draft draft-ietf-mls-protocol-17, Internet Engineering Task Force, December 2022. Work in Progress

[^15]: Barnes, R., Millican, J., Omara, E., Cohn-Gordon, K., Robert, R.: Message layer security (mls) wg (2018). [https://datatracker.ietf.org/wg/mls/about/](https://datatracker.ietf.org/wg/mls/about/)

[^16]: Bienstock, A., Dodis, Y., Garg, S., Grogan, G., Hajiabadi, M., Rösler, P.: On the worst-case inefficiency of CGKA. In: Kiltz, E., Vaikuntanathan, V. (eds.) TCC 2022, Part II. LNCS, vol. 13748, pp. 213–243. Springer, Heidelberg (2022). [https://doi.org/10.1007/978-3-031-22365-5\_8](https://doi.org/10.1007/978-3-031-22365-5_8)

[^17]: Bienstock, A., Dodis, Y., Tang, Y.: Multicast key agreement, revisited. In: Galbraith, S.D. (ed.) CT-RSA 2022. LNCS, vol. 13161, pp. 1–25. Springer, Cham (2022). [https://doi.org/10.1007/978-3-030-95312-6\_1](https://doi.org/10.1007/978-3-030-95312-6_1)

[^18]: Brzuska, C., Cornelissen, E., Kohbrok, K.: Cryptographic security of the MLS RFC, draft 11. Cryptology ePrint Archive, Report 2021/137 (2021). [https://eprint.iacr.org/2021/137](https://eprint.iacr.org/2021/137)

[^19]: Brzuska, C., Cornelissen, E., Kohbrok, K.: Security analysis of the MLS key derivation. In: 2022 IEEE Symposium on Security and Privacy, pp. 2535–2553. IEEE Computer Society Press, May 2022

[^20]: Buterin, V.: Ethereum: a next-generation smart contract and decentralized application platform (2014)

[^21]: Chase, M., Perrin, T., Zaverucha, G.: The signal private group system and anonymous credentials supporting efficient verifiable encryption. In: Ligatti, J., Ou, X., Katz, J., Vigna, G. (eds.) ACM CCS 2020, pp. 1445–1459. ACM Press, November 2020

[^22]: Cohn-Gordon, K., Cremers, C.J.F., Garratt, L.: On post-compromise security. In: IEEE 29th Computer Security Foundations Symposium, CSF 2016, Lisbon, Portugal, 27 June–1 July 2016, pp. 164–178. IEEE Computer Society (2016)

[^23]: Cong, K., Eldefrawy, K., Smart, N.P., Terner, B.: The key lattice framework for concurrent group messaging. Cryptology ePrint Archive, Report 2022/1531 (2022). [https://eprint.iacr.org/2022/1531](https://eprint.iacr.org/2022/1531)

[^24]: Devigne, J., Duguey, C., Fouque, P.-A.: MLS group messaging: how zero-knowledge can secure updates. In: Bertino, E., Shulman, H., Waidner, M. (eds.) ESORICS 2021. LNCS, vol. 12973, pp. 587–607. Springer, Cham (2021). [https://doi.org/10.1007/978-3-030-88428-4\_29](https://doi.org/10.1007/978-3-030-88428-4_29)

[^25]: The Matrix.org Foundation: Matrix specification (2023). [https://spec.Matrix.org/v1.6](https://spec.matrix.org/v1.6)

[^26]: The Matrix.org Foundation: Matrix state resolution (2023). [https://spec.Matrix.org/v1.6/rooms/v10](https://spec.matrix.org/v1.6/rooms/v10)

[^27]: Gentry, C., Silverberg, A.: Hierarchical ID-based cryptography. In: Zheng, Y. (ed.) ASIACRYPT 2002. LNCS, vol. 2501, pp. 548–566. Springer, Heidelberg (2002). [https://doi.org/10.1007/3-540-36178-2\_34](https://doi.org/10.1007/3-540-36178-2_34)

[^28]: Wire Swiss GmbH. Wire security whitepaper (2021). [https://wire-docs.wire.com/download/Wire+Security+Whitepaper.pdf](https://wire-docs.wire.com/download/Wire+Security+Whitepaper.pdf)

[^29]: Google: Google docs (2023). [https://docs.google.com/](https://docs.google.com/)

[^30]: Green, M.D., Miers, I.: Forward secure asynchronous messaging from puncturable encryption. In: 2015 IEEE Symposium on Security and Privacy, pp. 305–320. IEEE Computer Society Press, May 2015

[^31]: Hashimoto, K., Katsumata, S., Postlethwaite, E., Prest, T., Westerbaan, B.: A concrete treatment of efficient continuous group key agreement via multi-recipient PKEs. In: Vigna, G., Shi, E. (eds.) ACM CCS 2021, pp. 1441–1462. ACM Press, November 2021

[^32]: Hashimoto, K., Katsumata, S., Prest, T.: How to hide MetaData in MLS-like secure group messaging: simple, modular, and post-quantum. In: Yin, H., Stavrou, A., Cremers, C., Shi, E. (eds.) ACM CCS 2022, pp. 1399–1412. ACM Press, November 2022

[^33]: Howell, C., Leavy, T., Alwen, J.: Wickr messaging protocol: technical paper (2019). [https://wickr.com/wp-content/uploads/2019/12/WhitePaper\_WickrMessagingProtocol.pdf](https://wickr.com/wp-content/uploads/2019/12/WhitePaper_WickrMessagingProtocol.pdf)

[^34]: Jabber. Jabber (2023). [https://www.jabber.org/](https://www.jabber.org/)

[^35]: Kajita, K., Emura, K., Ogawa, K., Nojima, R., Ohtake, G.: Continuous group key agreement with flexible authorization and its applications. Cryptology ePrint Archive, Report 2022/1768 (2022). [https://eprint.iacr.org/2022/1768](https://eprint.iacr.org/2022/1768)

[^36]: Katsumata, S., Kwiatkowski, K., Pintore, F., Prest, T.: Scalable ciphertext compression techniques for post-quantum KEMs and their applications. In: Moriai, S., Wang, H. (eds.) ASIACRYPT 2020. LNCS, vol. 12491, pp. 289–320. Springer, Cham (2020). [https://doi.org/10.1007/978-3-030-64837-4\_10](https://doi.org/10.1007/978-3-030-64837-4_10)

[^37]: Marlinspike, M., Perrin, T.: The double ratchet algorithm, November 2016. [https://whispersystems.org/docs/specifications/doubleratchet/doubleratchet.pdf](https://whispersystems.org/docs/specifications/doubleratchet/doubleratchet.pdf)

[^38]: Marlinspike, M., Perrin, T.: Signal - technical information (2022). [https://signal.org/docs/](https://signal.org/docs/)

[^39]: Matrix.org. are we MLS yet? (2023). [http://arewemlsyet.com/](http://arewemlsyet.com/)

[^40]: Matrix.org. Decentralised MLS (2023). [https://gitlab.matrix.org/matrix-org/mls-ts/-/blob/decentralised2/decentralised.org](https://gitlab.matrix.org/matrix-org/mls-ts/-/blob/decentralised2/decentralised.org)

[^41]: Nakamoto, S.: Bitcoin: a peer-to-peer electronic cash system, December 2008

[^42]: Oikarinen, J., Reed, D.: Internet relay chat protocol. RFC 1459, RFC Editor (1993)

[^43]: Phoenix R &D and Cryspen. OpenMLS (2023). [https://github.com/openmls/openmls](https://github.com/openmls/openmls)

[^44]: Microsoft Teams: Group chat software (2023). [https://www.microsoft.com/en-us/microsoft-teams/group-chat-software](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software)

[^45]: Wallez, T., Protzenko, J., Beurdouche, B., Bhargavan, K.: TreeSync: authenticated group management for messaging layer security. Cryptology ePrint Archive, Report 2022/1732 (2022). [https://eprint.iacr.org/2022/1732](https://eprint.iacr.org/2022/1732)

[^46]: Weidner, M.: Group messaging for secure asynchronous collaboration. MPhil dissertation (2019). Advisors: A. Beresford and M. Kleppmann (2019). [https://mattweidner.com/acs-dissertation.pdf](https://mattweidner.com/acs-dissertation.pdf)

[^47]: Weidner, M., Kleppmann, M., Hugenroth, D., Beresford, A.R.: Key agreement for decentralized secure group messaging with strong security guarantees. In: Vigna, G., Shi, E. (eds.) ACM CCS 2021, pp. 2024–2045. ACM Press, November 2021

[^48]: WhatsApp: Whatsapp encryption overview (2023). [https://www.whatsapp.com/security/WhatsApp-Security-Whitepaper.pdf](https://www.whatsapp.com/security/WhatsApp-Security-Whitepaper.pdf)
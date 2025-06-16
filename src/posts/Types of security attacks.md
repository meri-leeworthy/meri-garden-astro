We have broadly learned the different classifications of security attacks that can happen and how an attacker seeks to carry them out on a system and why they are challenging to address completely. In this lesson, we will further explore each of the security attack classifications and examine how some of the various attacks are carried out on a system and why they are classified as such.

## Release of message contents

This is a passive attack wherein an attack is able to obtain information discreetly that is being shared between two parties involved in the communication. This attack generally exploits the medium for transmission in order to obtain information that may not be intended for anyone else except the receiver.

## Traffic analysis

This is an even more subtle passive attack, as the attacker's main goal is only to analyse the communication patterns that occur between the sender and the receiver. While it may not always be possible to determine the exact communication, an attacker can exploit this knowledge to infer the topic of discussion or predict the next possible communication time between the sender and receiver.

## Masquerade – active attack

In this type of attack, the attacker's goal is to pretend or 'masquerade' as someone else, thereby attempting to deceive other systems into believing that the attacker is either the sender or the receiver. While this is not always possible in real life, as computers communicate using other methods of identification, an attacker who wishes to masquerade as someone else only needs to obtain this identification metric. Generally, the approach adopted to obtain this metric is done via a passive attack.

## Replay – active attack

This is another example of an active attack wherein an attacker passively captures and analyses network traffic between a sender and receiver. The attacker decides to deceive one party into believing it is the other by replaying a previously sent message, which can be then used to continue the conversation or even attempt to gain unauthorised access to resources on the system.

## Modification of messages – active attack

As the name suggests, an attacker uses a passive attack to obtain information which is then modified and replayed back to the receiver. Generally, an attacker intercepts the communication causing some kind of transmission delay or other error wherein the receiver is then deceived into providing the attacker with some unauthorised access.

## Denial of service – active attack

A more deadly example of an active attack. This attack requires the attacker to monopolise the resources of a given system to the point where that system no longer has the resources to handle legitimate requests from actual users as all its resources are being used to respond to the attacker. This causes normal users to not be able to use the service provided by that system. Given the resources available to most modern systems, attackers performing a denial of service attack can do so in a multitude of ways.

# Impact of a security attack

Any attack on a computer system is not desirable. However, when considering security, it is important to understand that each attack can have a certain impact on the system and the organisation to whom the system belongs to. With this in mind, the impact of a security attack is generally classified as follows:

- **Low impact:** The security attack has a limited impact on the organisation. The organisation is still able to perform its required duties and provide the required services, however, the quality of the services provided could show some degradation, the company assets could be slightly compromised, there could be minor financial losses, or the attack could cause minor harm to individuals.  
    
- **Medium impact:** The security attack has an adverse impact on the organisation. The organisation may be able to continue its operations and services but the quality of the services provided would show significant degradation, the company assets could be significantly compromised, or there could be significant financial losses, or serious harm to individuals.  
    
- **High impact:** The security attack has a catastrophic impact on the organisation. The organisation may no longer be able to continue its operations and services, or the company assets could be completely compromised, or there could be major financial losses, or major harm to individuals.
    

# Threat consequences of security attacks

When a security attack is carried out, an adversary generally poses one or more of the following threats:

## Unauthorised disclosure

This is a threat to confidentiality as the information is now known by an unintended recipient. Some possible attacks that could lead to this consequence include:

- **Exposure:** This involves the deliberate release of sensitive information.
    
- **Interception:** Sensitive data is accessed without authorisation during transmission from sender to receiver.
    
- **Interference:** Sensitive data is accessed without authorisation but generally as a result of a by-product of the communication between sender and receiver.
    
- **Intrusion:** Sensitive data is accessed without authorisation by an entity that circumvents the security protection on the system.
    

## Deception

This is a threat to integrity as the information received by the recipient may be modified but the recipient is unaware of this. Some possible attacks that could lead to this consequence include:

- **Masquerade:** An adversary gains access to a system by pretending to be someone else.
    
- **Falsification:** An adversary modifies data sent to an authorised entity without them knowing.
    
- **Repudiation:** An adversary falsely denies sending a communication or performing an action.
    

## Disruption

This is a threat to availability wherein an action is performed that compromises a system, making it unavailable to other users. Some possible attacks that could lead to this consequence include:

- **Incapacitation:** An adversary disables a critical component, thereby interrupting the operations of the system.
    
- **Corruption:** An adversary modifies key system data or functions, thereby altering the system's operations in an undesirable way.
    
- **Obstruction:** An adversary interrupts normal system operations by hindering them in some way.
    

## Usurpation

This is a threat to integrity wherein a system is compromised but still operational, however, users and other systems are unaware of this. Some possible attacks that could lead to this consequence include:

- **Misappropriation:** An adversary assumes control of a resource available on a system.
    
- **Misuse:** An adversary causes a system to perform an action that is detrimental to the security of the system.
    

From this, we get a general idea of the various attacks and the threats they pose. In practice, most attacks tend to be a combination of some of these concepts to varying degrees.

Next: [[The OSI security architecture]]
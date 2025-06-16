While the OSI security architecture is widely accepted as a standard when considering security for modern systems, despite years of research and development done on this topic, it is still not possible to design a system that can completely eliminate all security flaws, thereby preventing unauthorised access to that system. As such, many government organisations collectively defined a set of requirements based on functionality and a set of design principles that government systems must adhere to in order to ensure the maximal level of security. We will briefly discuss the theory behind these in this lesson.

## Functional requirements

The FIPS 200 (_Minimum Security Requirements for Federal Information and Information Systems_) document outlines a set of functional requirements mandated to secure federal information systems. These requirements can be classified based on technical application to either hardware, or software, or both; or as managerial implementations intended for those systems. Below we outline these functional requirements.

- **Access control:** This requirement mandates that access to the system should be limited and controlled so that only authorised users can access the system and/or its services.
    
- **Awareness and training:** This requirement mandates that all users within the organisation should be informed and trained to handle the various security risks that could result due to their utilisation of the system.
    
- **Audit and accountability:** This requirement mandates that organisations should maintain audit logs of all activities carried out on the system to the extent that all logs can be used to ensure accountability to all users for their actions.
    
- **Certification, accreditation, and security assessments:** This requirement mandates that organisations should monitor their information systems to ensure that all systems are secure and do not have any open or unidentified vulnerabilities, and should have a plan to fix any vulnerabilities identified.
    
- **Configuration management:** This requirement mandates that organisations should keep a record of baseline configurations for all systems and use these to enforce information system security.
    
- **Contingency planning:** This requirement mandates that organisations should define and implement emergency response plans that can be used when an emergency occurs to ensure that the organisation's information systems can be reinstated to provide critical services as soon as possible.
    
- **Incident response:** This requirement mandates that organisations should monitor, record, report, and handle incidents as and when they occur as well as have a plan to detect and mitigate, contain, or recover from any incident.
    
- **Maintenance:** This requirement mandates that all systems should be periodically assessed and maintenance should be carried out for any systems that require maintenance or upgrades.
    
- **Media protection:** This requirement mandates that an organisation should ensure that all media is protected, both hard copy and digital.
    
- **Physical and environmental protection:** This requirement mandates that critical information systems should generally have physical access limited, and all areas that contain information systems should have proper environmental controls set up.
    
- **Planning:** This requirement mandates that organisations should maintain security plans that outline the various aspects required to set up, administer, and maintain security for all information systems within the organisation.
    
- **Personnel security:** This requirement mandates that all personnel responsible for critical information systems meet key criteria to be employed in those positions.
    
- **Risk assessment:** This functionality mandates that an organisation should periodically perform various risk assessments for key information systems and/or processes used within the organisation.
    
- **Systems and services acquisition:** This requirement mandates that an organisation should ensure that the necessary provisions are available, either internally or externally, to protect the information systems and all pertaining aspects used within the organisation.
    
- **System and communications protection:** This requirement mandates that an organisation should monitor, control, and protect all communications within the organisation.
    
- **System and information integrity:** This requirement mandates that an organisation should ensure system and information integrity at all times and must ensure that a response plan in place should a compromise occur.
    

## Design principles

As systems can be complex and diverse, the following are some commonly accepted design principles that have been adopted towards the design of security mechanisms in order to secure computing systems.

- **The economy of mechanism:** This principle stipulates that security mechanism designs should be small and simple, thereby making them easier to test and verify in comparison to complex designs.
    
- **Fail-safe defaults:** This principle stipulates that default access should always be to deny rather than allow. This will ensure that access is only granted based on permission instead of exclusion.
    
- **Complete mediation:** This principle stipulates that access decision should not be made based on cache or previously granted access permissions. All requests must be checked each time.
    
- **Open design:** This principle stipulates that the design used for the security mechanism should be open and not a secret.
    
- **Separation of privilege:** This principle stipulates that access determination should be associated with multiple attributes that collectively determine access rights.
    
- **Least privilege:** This principle stipulates that all users and operations within a computing system must only be given the least amount of privileges needed in order to perform the required tasks.
    
- **Least common mechanism:** This principle stipulates that multiple users should not share functionality, thereby ensuring mutual security by reducing the number of communication paths.
    
- **Psychological acceptability:** This principle stipulates that the security mechanism design should not impose any effort on the part of the user required to use it that impacts their work, but at the same time it should meet the requirements for security for the system.
    
- **Isolation:** This principle stipulates that infrastructure systems should be isolated from each other based on their intended utilisation.
    
- **Encapsulation:** This principle stipulates that by applying object-oriented programming techniques, system functionality can be collectively self-contained so as to be able to perform the required actions completely.
    
- **Modularity:** This principle stipulates that when designing a security mechanism, the functionality should be designed as separate, functional modules.
    
- **Layering:** This principle stipulates that security should be applied in layers that aim at protecting all the various aspects interacting with the system from the people, the technology, and the various operational aspects of the system.
    
- **Least astonishment:** This principle stipulates that the way the system responds to the user should always cause the least astonishment to the user.
    

**Note:** While the above requirements and principles are theoretical in nature, they do form part of the accepted practices that modern data security mechanism are designed by.

Next: [[A model for network security]]
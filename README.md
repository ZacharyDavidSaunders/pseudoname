![Pseudoname_API][logo]

[![Pseudoname](https://img.shields.io/website-Online-Offline-limeGreen-red/https/pseudoname.io.svg?label=Pseudoname%20Website&style=flat)](https://pseudoname.io) [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)][Mozilla Public License 2.0]
 
## [Click me to go to the site!][Pseudoname site]

## What is "Pseudoname"?

At it's core, Pseudoname is a free, disposable email alias generating service. Pseudoname allows you to link your email address to custom aliases. These aliases can be used to sign up for online services and offer a layer of protection between the services and your private information.

## Why use an alias?

Users tend to use common credentials between sites, despite warnings from cybersecurity professionals, and this may lead to disastrous consequences; should a single one of an individual’s accounts become compromised via a data breach, every other account belonging to the individual instantly becomes accessible to the public as well. Using a unique password for each user account certainly adds protection, as the credentials for one account are no longer valid for another, however, that still leaves a single point of failure, the email address associated with the accounts. Simply put, this problem, the usage of one email address across several user accounts, is the issue that aliases solve. 

When users create aliases with Pseudoname, they are able to treat email addresses like burner phones, use them for as long as they are secure, and then delete them when they are exposed online.

## How do I receive emails destined to my aliases?
Simply check the email associated with the aliases. Upon creation, each alias is linked to an email address. When Pseudoname receives an email destined to an alias, it automatically forwards it off to the associated email address.

## How many aliases can I have?
As many as you want. However, you may not register an alias already in use by you, or another user.

## How do I delete an alias?
Go to the [Pseudoname site][Pseudoname site], enter the alias, and corresponding email, and press delete.

## Can someone else delete my aliases?
No. In order to delete an alias, both the alias and associated email are required. Without these two pieces of information (which only you have), email deletion requests are refused.

## Is this service secure? Can I trust you with my emails?

Yes, the service is secure. Pseudoname never gets access to your emails. We couldn't read them even if we wanted to — and we don't. Your emails are your business.

## What is "PseudonameAPI"?
PseudonameAPI is the backend service that runs the Pseudoname site. It too is open source and more information about it can be found [here][PseudonameAPI Repo]!

![PseudonameAPI Diagram][PseudonameAPI Diagram]

## Pull Requests / Contributions

Pull requests are welcome and will be reviewed and merged in a case-by-case basis. If a Pull Request is urgent, please send an email to contactus@pseudoname.io

## To-Do's
 - Integrate with PseudonameAPI — *(Release 2.0)*
 - Add an edit alias feature.

## Release Notes
You'll find information about each release below.
#### Version 1.0 [Beta]
* Built the MVP version of the site. This version has the site directly communicate with ForwardMX and thus leaves the API key exposed. This version will soon be replaced with a more secure version that connects to PseudonameAPI. *(When this migration occurs, the API key and all aliases will be purged, and users will be notified that the Beta has ended).*

## License

[Mozilla Public License 2.0]

   [logo]: https://i.imgur.com/vkk6ImG.jpg
   [PseudonameAPI Diagram]: https://i.imgur.com/Y5fKw3d.jpg
   [Mozilla Public License 2.0]: https://github.com/ZacharyDavidSaunders/pseudoname/blob/master/LICENSE
   [Pseudoname site]: https://pseudoname.io
   [PseudonameAPI Repo]:https://github.com/ZacharyDavidSaunders/PseudonameAPI/
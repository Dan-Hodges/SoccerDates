# SoccerDates

## About

SoccerDates is a client-side Angular app I build for my front-end capstone. I my previous profession I was a soccer coach.
The annual scheduling meeting was a nightmare. SoccerDates is an app that allows users to create an email address and schedule games. 
All users are automatically added to a league that shows the dates, open and booked, for all other opponents. Features include adding and cancelling games,
as well as sending and rejecting invitations.

SoccerDates is build off of @bradberger's Angular-Material-Calendar. When I launched this project, his calendar plugin was very young-
it had numberous bugs and zero documentation. In order to make the calendar work with my app, 
I had to modify the source code quite substantially. 

## Known Issues & Notes
This app is slowly being refactored as time permits to conform to John Papa's Angular Style Guide. During my time NSS, I had two weeks to understand and modify a fairly complex piece of software. 
Due to my time constraints, several compromises were made.

Local data is syned with firebase with brute force loops. This logic is less than ideal and will be rewirtten, time permitting.

Angular-Material-Calendar is incompatible with the latest version of Angular-Material. Becuase of this, I had to use 
Angular-Material 0.10.1 which is not without its shortcomings. The most obvious is that in the dialog controller for 
selecting time, date, and opponents, angular-material throws an ng-duplicates error if not set to allow for multiple selections.
This creates a less than ideal user experience where one must select an option, then click out of the dropdown menu to 
close it instead of having the selection box automatically closing. 

## Frameworks, Libraries, Plugins, and Other Dependencies

* AngularJS
* Material Design
* AngularFire
* AngularRoute
* Firebase
* Bower

## Installation

To view this application and its code, run:

* `git clone https://github.com/dan-hodges/SoccerDates.git`
* cd Lib `Bower install`
* If prompted to select a angular-material version, make sure to choose 0.10.1 or the option that is required by CalTest.

## Serving & Use

* From your project directory, run your prefered HTTP server (ex. python -m SimpleHTTPServer).
* Login with username tca@tca.com password pass.

## Contact

https://github.com/DanHodges/

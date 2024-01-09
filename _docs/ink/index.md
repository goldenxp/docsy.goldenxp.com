---
title: Ink
tags: 
 - ink
 - gamedev
description: Ink Documentation, Articles and other write-ups
---

# Ink

## What is Ink?
In a few words, it's an open-source scripting language for interactive narratives. It can be used to develop games which is the major focus of this documentation section.
More info can be found on the [official website](https://www.inklestudios.com/ink/). 

### Before You Start
While reading the official documentation, you might get overwhelmed by Inkle's unique terms and concepts. Despite being called Ink, it is less about text fluid and more closely related to its creator's namesake i.e. Inkle. An inkle is a narrow linen tape often used to make shoelaces. Hopefully knowing this makes lingo like knots and threads a little less confusing.  

## Articles
* [Metroidvania Pacing Charts in Ink]({{ site.baseurl }}/ink/metroidvania)
* [Ink Numeric Input]({{ site.baseurl }}/ink/numericinput)
* [Ink Text Logs]({{ site.baseurl }}/ink/log)
* [Making a World Map in Ink]({{ site.baseurl }}/ink/worldmap)
* [Mixing Ingredients in Ink]({{ site.baseurl }}/ink/ingredientmixing)

## Lingo

### ➥Operators

| Operator        	| Purpose                                      	| Example                                                                                                                                                                                                                   	| Notes                                                                                                                                                                                                                                                                                                                                                          	|
|-----------------	|----------------------------------------------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| //              	| Single line comment                          	| // Explaining why not describing what                                                                                                                                                                                     	| Content after // is ignored by the Ink compiler for just that line.                                                                                                                                                                                                                                                                                            	|
| /*  */          	| Multiple line comment                        	| /* Not much<br>is going on here<br>indeed */                                                                                                                                                                              	| Content between /* and */ is ignored by the Ink compiler.                                                                                                                                                                                                                                                                                                      	|
| #               	| Tagging                                      	| I didn't do it. #VO_ID_123                                                                                                                                                                                                	| Only one tag per line is allowed, meant for metadata purposes.                                                                                                                                                                                                                                                                                                 	|
| *               	| Choice/Option                                	| The phone rings.<br>* Answer<br>* Ignore                                                                                                                                                                                  	| Input mechanism for making decisions.<br>Once used, it is consumed and never offered again.                                                                                                                                                                                                                                                                    	|
| +               	| Sticky Choice/Option                         	| The phone rings again.<br>+ Answer<br>+ Ignore                                                                                                                                                                            	| A choice that never gets consumed.<br>It "sticks" around.                                                                                                                                                                                                                                                                                                      	|
| []              	| Text Inline Skip/Break<br>(for Choices only) 	| * Jump[?! It's risky tho...]ing off the cliff was a bad idea.<br><br>// Choice: Jump?! It's risky tho...<br>// Response: Jumping off the cliff was a bad idea.                                                            	| Text presented between the square brackets is shown in the choice text but not in its response.<br>Text after the square brackets is not shown in the choice and only in the response.<br>This technique is sometimes referred to as Weave-Style.                                                                                                              	|
| <>              	| Prevent line breaks                          	| I didn't know <><br>what to do!                                                                                                                                                                                           	| Called "glue," it sticks lines together. <br>Angle brackets must be next to each other, no spaces in between! <br>Can be used at the end of the first line or beginning of the second.                                                                                                                                                                         	|
| {}              	| Print variables or expressions               	| VAR dog = "Odie"<br>VAR cat = "Garfield"<br><br>{dog + " and " + cat} // Prints: Odie and Garfield<br>{ 1 > 100 } // Prints: false                                                                                        	| Useful for exposing variable values to the reader.<br>Can also be used for debugging purposes.<br>Cannot print text content unless you wrap it as a string.                                                                                                                                                                                                    	|
| { \| }          	| Variable Text                                	| { First Time! \| Welcome back! }<br><br>Good {& Morning \| Afternoon \| Evening } to you.<br><br>{! Try the fish. \| Now, try the stew. \| Last one, try the pie! }<br><br>Seeing you makes us {~ happy\| glad\| joyful}! 	| Called "alternatives," `|` separators split text between braces into chunks and shows them:<br>* Sequences (no prefix) - in order and holds the last one<br>* Cycles (&) - in order and loops back to the first<br>* Once-Only (!) - in order and holds the last one as blank<br>* Shuffle (~) - randomly<br><br>Can be nested and used in choices. See docs. 	|
| { : }           	| Inline Condition                             	| VAR stat = 9001<br>{ stat > 9000 : It's over 9000!! }<br>It's a { stat <= 177 : \| mis}match.                                                                                                                             	| Evaluates an expression and outputs the following text if it's true.<br>If a `|` separator is used to split the text, only the second chunk is used if false.                                                                                                                                                                                                 	|
| * { }           	| Conditional Choice                           	| + { HP > 0 } Fight<br>+ { HP > 10 } { item_count > 0} Use Item<br>* { RANDOM(1,12) <= 6 } Flee                                                                                                                            	| Activates or deactivates a choice (sticky or not) based on a conditional check.<br>Multiple conditions can be used, and their expressions can also utilize logical operators                                                                                                                                                                                   	|
| ==             	| Section of Text Content                      	| == section1<br>-> DONE<br><br>=== section2 ===<br>-> DONE                                                                                                                                                                 	| Called "knots," these mark sections of text and give them a label for redirection purposes.<br>Sections need to flow into other sections or terminate properly with `-> DONE` or `-> END`                                                                                                                                                                      	|
| =               	| Sub-section of Text Content                  	| === section1<br>= subsection1<br>content                                                                                                                                                                                  	| Called "stitches," these can break up knots to manage huge amounts of text.<br>Stitches have their own labels and other knots can redirect to them.                                                                                                                                                                                                            	|
| ->              	| Go to a specific section                     	| === section1<br>Section 1<br>-> section2                                                                                                                                                                                  	| Called "diverts," these change the flow of the story by redirecting it.                                                                                                                                                                                                                                                                                        	|
| -               	| Capture story flow                           	| * Decide Left<br>* Decide Right<br><br>- Pointless. You can only go forward!                                                                                                                                              	| Called "gathers," these redirect the story to itself. <br>It's a type of fallback mechanism often used to create chokepoints for choices that do not divert.                                                                                                                                                                                                   	|
| ( )             	| Labels gathers and choices                   	| * (picked_left) Decide Left<br>* Decide Right<br><br>- (feedback) You were { picked_left : correct!\| wrong...}<br><br>+ [Can you repeat that?] -> feedback<br>* [I'm done.] Goodbye. -> DONE                             	| Allows testing and diverting on gathers and options.<br>If diverted to a choice, it is immediately chosen.                                                                                                                                                                                                                                                     	|
| ~               	| Denotes an expression                        	| VAR found = false<br>I found the ruby!<br>~ found = true                                                                                                                                                                  	| Sets a line as code to be evaluated instead of text content                                                                                                                                                                                                                                                                                                    	|
| + - * / %       	| Math operators                               	|                                                                                                                                                                                                                           	| You can use `mod` instead of `%`                                                                                                                                                                                                                                                                                                                               	|
| == != >= <= < > 	| Comparison operators                         	|                                                                                                                                                                                                                           	|                                                                                                                                                                                                                                                                                                                                                                	|
| && \|\|         	| AND/OR Logic operators                       	|                                                                                                                                                                                                                           	| You can use `and` instead of `&&`.<br>You can use `or` instead of `||`.                                                                                                                                                                                                                                                                                       	|
| !               	| NOT operator                                 	| VAR read = true<br>VAR status = true<br>~ status = !read<br>{ status } // false<br>{ !status } // status (once-only)<br>{ not status } // true                                                                            	| Negates an expression.<br>You can use `not` instead of `!`, sometimes necessary when used to print with `{}`.                                                                                                                                                                                                                                                  	|
| ?               	| Has check                                    	| VAR status = "Diplomatic Immunity"<br>{ status ? "Immunity" } // outputs true                                                                                                                                             	| Checks if a list variable has a specific flag set.<br>Checks if a string contains another string (substring).<br>You can use `has` instead of `?`.                                                                                                                                                                                                             	|
| !?              	| "Has not" check                              	|                                                                                                                                                                                                                           	| Negation of Has check.<br>You can use `hasnt` instead of `!?`.                                                                                                                                                                                                                                                                                                 	|
| ^               	| Intersection check                           	| LIST parts = thumb, belly, tail<br>VAR dog = (belly, tail)<br>VAR human = (thumb, belly)<br><br>{ dog ^ human } // outputs belly                                                                                          	| Checks if two list variables have overlapping values. <br>Returns a list variable.                                                                                                                                                                                                                                                                             	|

### ➥Keywords

| Keyword     	| Purpose                                    	| Example                                                                                                                                                                         	| Notes                                                                                                                                                                                                                                                                                                                     	|
|-------------	|--------------------------------------------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| CONST       	| Defines a global constant                  	| CONST PI = 3.1415                                                                                                                                                               	|                                                                                                                                                                                                                                                                                                                           	|
| VAR         	| Defines a global variable                  	| VAR x = "spot"                                                                                                                                                                  	| Always hoisted and initialized once.<br>Can initialize to a constant but not to other variables nor expressions.                                                                                                                                                                                                          	|
| temp        	| Defines a temporary variable               	| ~ temp doublePI = PI * 2                                                                                                                                                        	| Only exists in the knot/stitch it was defined in.<br>Needs `~` to be evaluated.                                                                                                                                                                                                                                           	|
| LIST        	| Defines an Ink List                        	| LIST weekdays = Mon, Tues, Wed, Thurs, Fri                                                                                                                                      	| Lists are variables that are Boolean sets as well as enums.<br>Read the official docs for more info.                                                                                                                                                                                                                      	|
| function    	| Defines an Ink function                    	| VAR item_count = 10<br><br>You were robbed.<br>{get_robbed()} // function call<br>You have {item_count} items. // outputs 0<br><br>== function get_robbed()<br>~ item_count = 0 	| Functions are knots that can call other functions and return values.<br>They do not support diverts, choices and stitches. Labelled gathers are supported. <br><br>Since they are knots, `==` needs to be prefixed.<br><br>Functions are called with `()` within `~` or `{}`, the latter prints the return value, if any. 	|
| return      	| Function return                            	| { square(10) } // outputs 100<br><br>=== function square(x)<br>~ return x * x                                                                                                   	| Stops function evaluation and returns a value.<br>Needs `~` to be processed.                                                                                                                                                                                                                                              	|
| else        	| Condition block run if all fails           	| { RANDOM(1,6) > 3 :<br>    You win.<br>- else: <br>    You lose.<br>}                                                                                                           	| Acts like else in if-else statement.<br>Acts like default in switch-case statement.                                                                                                                                                                                                                                       	|
| true, false 	| Values of boolean variables                	|                                                                                                                                                                                 	| Reserved keywords but only in lowercase. So "True" is okay for a knot-name.                                                                                                                                                                                                                                               	|
| INCLUDE     	| Combines an Ink file with the current one. 	| INCLUDE test.ink                                                                                                                                                                	| Knot and global variable names must be unique or duplicate errors will be reported.                                                                                                                                                                                                                                       	|
| EXTERNAL    	| Defines a game engine function             	| EXTERNAL GetTime()                                                                                                                                                              	| It's a good idea to implement a fallback function in Ink so that lines that call external functions can run correctly outside of the game engine.                                                                                                                                                                         	|
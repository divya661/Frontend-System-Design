Statement: `Autocomplete Low-Level Design`
Tech Stack: Vanila JS, CSS & HTML
Must Have:
# On typing inside the search box, it should suggest options
# Users should be able to select one of the options

Good to have:
# Search should be performant enough
# It should avoid unnecessary network calls
# It should be re-usable & customizable
# It should persist previously fetch data

Questions to clarify with Interviewer:
# Is there a figma or any sort of design how it should look? Answer : Something like google or flipkart search
# Is search needs to be done on enter, searching while typing or submit button ? Answer: No submit or entering required, search while typing
# Is there any local API for data ? Answer: Use a hard-coded data & mimic it like api using promise 
# Is there a need for default suggestion or it is like whenever we are typing we will get a suggestion ? Answer: Whenever we type will be a get a suggestion no default
# tweddit

# @TODO:
- URL regex to make sure it's a proper tweet url
- Friends/Frenemies exclude self
- Make votes highlight which one the user has done (up or down). Allow a cancel (edit) - Currently anyone can add ∞
- UI improvements
- Better UI/UX tests
- Get it working on docker
- Put docker on aws

# @QA:
- User's home page
  - Explanation of what a tweddit is @LB @Estimate(15 minutes)
  - list of all users with links -> view any user page @LB @Estimate(30 minutes)
- A view any user page (anonymous can view)
  - lets you see their tweddits @LB @Estimate(1 hour)
- Viewing own tweddit
  - Shouldn't be able to vote. @Estimate(15 mins)
  - Shouldn't be able to comment. @Estimate(15 mins)
  - Maybe edit title? @Estimate(15 mins)
  - Ability to delete. @Estimate(15 mins)
     - Remove orphaned comments and votes
- Friends/Frenemies should link to user's page @Estimate(15 mins)
- Confirm email address sent to a new User @Estimate(30 minutes)

(@LB = launch blocker)



+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)

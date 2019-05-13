# Collaboration

This document describes how we collaborate developing Mysterium VPN app.

Main collaboration goals:

- Fast feature delivery
- Stable product
- Well-being of teammates and contributors

## Pull requests

### Branch name

Choose appropriate branch name to clarify what this PR is about.

- Select appropriate tag:
  - `hotfix` for small and/or urgent bug fixes
  - `bugfix` for larger bug-fixes
  - `feature` for changes that change or add new functionality
  - `refactor` for changes that does not change program behaviour

### Communication

We're all people, so have in mind that we can make mistakes, be subjective and have a feelings.
When communicating in PRs, we should:

- Be **polite** and **friendly** - miscommunicating online is common, so it's very easy to misunderstand other people
- Be **objective** when possible - i.e. using statistics or external resources instead of simply expressing your opinion
- Be **open to different opinions** - everyone has a different mindset and the best solution could be achieved by investigating and considering different approaches
- Consider **talking in real life** (or even **pair-programming**) when communication online gets tricky

### Submitting PRs

When submitting a PR, make sure you've prepared it well in order to save your own time as well as time and energy of your teammates:

- Make sure **CI passes**
- Before making a PR, **review changes as if you were the reviewer** - see _Reviewing PR_ section
- (Optional) Add a **PR description** if changes are not obvious

### Getting feedback

Not many people think reviewing PRs is fun, so getting feedback is like getting a 🎁.

When disagreements happen:

- Try discussing it and understanding why opinions differ and how to achieve the best solution without conflicts
- Consider asking opinions of contributors outside of the discussion by tagging them
- Try referencing topics (articles/documentations) which explain your arguments

### Reviewing PRs

When reviewing a PR, focus on the functionality first.
It would be good if you could review functionality/business logic first.
A good start could be making sure that the presented implementation is acceptable or can be improved, followed by reviewing tests that freeze the solution, and only after that commenting on code style and readability improvements.

Tips:

- **Talk in person** before reviewing if PR is very unclear
- Consider **checking-out PR branch and play around** with it to see PR in action or try applying some improvements yourself
- Use **comment markers** (see below)

#### Comment markers

Use markers to show comment intention.
First 2 symbols in comments describes comment type:

1. Comment starts with `!!`:

   Developer should react to this comment - make code change or describe why code can't be changed

2. Comment starts with `??`:

   Code is hard to understand, developer should describe solution and reason

3. Comment starts with any other symbols:

   It's just idea shared with developer. Developer can make changes or ignore comment

## Coding values

### Testing:

Some of domain classes should be covered with **unit tests** where its methods seem complex.
For essential features, higher-level **integration tests** should be used to see whether units work when joined together.
UI should be tested separately from domain logic with **UI tests** - domain logic should be tested in unit tests, not in UI.

![testPyramid](https://martinfowler.com/articles/practical-test-pyramid/testPyramid.png)

- Happy, unhappy paths

### Maintainability

To avoid slowing down once project gets bigger, we have to keep our code maintainable.
It's not obvious what maintainable code is, so to have some objectivity, we prefer using popular design principles instead of personal opinions.
These include:

- [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) - don't repeat yourself
- [SOLID](https://en.wikipedia.org/wiki/SOLID):
  - [SRP](https://en.wikipedia.org/wiki/Single_responsibility_principle) - single responsibility principle
  - [Open/closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
  - [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
  - [Interface segregation principle](https://en.wikipedia.org/wiki/Interface_segregation_principle)
  - [Dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle)
- [KISS](https://en.wikipedia.org/wiki/KISS_principle) - keep it simple, stupid

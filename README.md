# World Affairs Council

A lightweight, server-rendered Ruby on Rails website.

## Requirements

- Ruby 3.2 or newer (Ruby 4.0.9 is used by this repository)
- SQLite 3

## Setup

On Apple Silicon, make sure Homebrew Ruby comes before macOS's system Ruby:

```sh
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
ruby --version
bundle --version
```

To keep this setting for future terminal sessions, add the `export` line to
`~/.zshrc`.

Then prepare and start the application:

```sh
bin/setup --skip-server
bin/rails server
```

`bin/setup` also detects the Homebrew installation automatically if the
system Ruby is still first in `PATH`.

Then open <http://localhost:3000>.

## Site structure

- `/` — mission, featured programs and upcoming events
- `/about` — mission, commitments and history
- `/programs` — speaker series, discussion groups and book club
- `/student-programs` — Academic WorldQuest and Model UN
- `/calendar` — upcoming public events
- `/get-involved` — membership, giving and volunteering
- `/news` — Council announcements and updates

Membership, donation and member-login links continue to use the Council's
existing Wild Apricot services until those workflows are migrated.

## Tests

```sh
bin/rails test
```

The application intentionally uses Rails' minimal stack. It has no Node.js,
React, JavaScript bundler, Action Cable, Active Storage, or background-job
dependency. These can be added later if the site's requirements grow.

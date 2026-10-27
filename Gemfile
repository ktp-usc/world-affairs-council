source "https://rubygems.org"

ruby ">= 3.2.0"

# Bundler added the unified :windows platform name in 2.4. Keep the Gemfile
# readable by older Bundler versions so they can report the Ruby requirement.
windows_platforms = if Gem::Version.new(Bundler::VERSION) >= Gem::Version.new("2.4.0")
  %i[ windows ]
else
  %i[ mingw x64_mingw mswin ]
end

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.1.4"
# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem "propshaft"
# Use sqlite3 as the database for Active Record
gem "sqlite3", ">= 2.1"
# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: windows_platforms + %i[ jruby ]

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri ] + windows_platforms, require: "debug/prelude"
end

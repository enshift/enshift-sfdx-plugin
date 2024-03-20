# summary

Deploy source metadata based on git diff

# description

Selectively deploys the metadata currently marked as modified in git

# flags.staged.summary

Choose to only deploy staged files instead of modified

# flags.staged.description

Choose to only deploy staged files instead of modified

# examples

- Selectively deploys the metadata currently marked as modified in git:

  <%= config.bin %> <%= command.id %>

- Selectively deploys the metadata currently marked as staged in git

  <%= config.bin %> <%= command.id %> --staged

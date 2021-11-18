name: Check

# Triggers the workflow on push or pull request events
on: [push, pull_request]

jobs:
  test-redoc:
    runs-on: ubuntu-latest
    name: Validate markdown
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: lint markdown file
        uses: nosborn/github-action-markdown-cli@v2.0.0
        with:
          files: .

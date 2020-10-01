enshift-sfdx-plugin
===================

Set of sfdx methods used by Enshift

[![Version](https://img.shields.io/npm/v/enshift-sfdx-plugin.svg)](https://npmjs.org/package/enshift-sfdx-plugin)
[![CircleCI](https://circleci.com/gh/enshift/enshift-sfdx-plugin/tree/master.svg?style=shield)](https://circleci.com/gh/enshift/enshift-sfdx-plugin/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/enshift/enshift-sfdx-plugin?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/enshift-sfdx-plugin/branch/master)
[![Codecov](https://codecov.io/gh/enshift/enshift-sfdx-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/enshift/enshift-sfdx-plugin)
[![Greenkeeper](https://badges.greenkeeper.io/enshift/enshift-sfdx-plugin.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/enshift/enshift-sfdx-plugin/badge.svg)](https://snyk.io/test/github/enshift/enshift-sfdx-plugin)
[![Downloads/week](https://img.shields.io/npm/dw/enshift-sfdx-plugin.svg)](https://npmjs.org/package/enshift-sfdx-plugin)
[![License](https://img.shields.io/npm/l/enshift-sfdx-plugin.svg)](https://github.com/enshift/enshift-sfdx-plugin/blob/master/package.json)

<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g enshift-sfdx-plugin
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
enshift-sfdx-plugin/0.0.2 darwin-x64 node-v14.5.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx enshift:source:deploy [-s] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-enshiftsourcedeploy--s--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx enshift:source:deploy [-s] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Selectively deploys the metadata currently marked as modified in git

```
USAGE
  $ sfdx enshift:source:deploy [-s] [-u <string>] [--apiversion <string>] [--json] [--loglevel
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -s, --staged                                                                      Choose to only deploy staged files
                                                                                    instead of modified

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx enshift:source:deploy
       Selectively deploys the metadata currently marked as modified in git
  $ sfdx enshift:source:deploy --staged
       Selectively deploys the metadata currently marked as staged in git
```
<!-- commandsstop -->

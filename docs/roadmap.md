# Roadmap
In the future, we would like to make it work in environments other than Vue.<br>
Therefore, we will gradually reduce the code that depends on Vue in several phases, and eventually release it as a completely new package.


We also aim to provide functions compliant with [Material 3 - Bottom Sheets](https://m3.material.io/components/bottom-sheets/specs). We plan to incorporate these features as they become available.

## Phase 1 (now)
|              |             |
| ------------ | ----------- |
| Release Date | **Q4 2023** |
| Version      | **5.0.0**   |
| Status       | ✅  Released |

With the end of Vue2 support, this library will be changed to a Vue3-only library. This change will reduce implementation considerations.
Also, v5.0.0 provides more detailed control over opening and closing of modals than before.

## Phase 2
|              |               |
| ------------ | ------------- |
| Release Date | **Q1 2024**   |
| Version      | **5.1.0**     |
| Status       | 🟡 In progress |

The internal logic will be updated for Phase 3. Specifically, we plan to modularize the group of functions that perform open/close animations so that they can run on other frameworks.
Our ultimate goal with this version is to make it independent of Vue's functionality.

## Phase 3
|              |                                          |
| ------------ | ---------------------------------------- |
| Release Date | **Q2 2024**                              |
| Version      | **@takuma-ru/web-bottom-sheets : 1.0.0** |
| Status       | 💤 Not started                            |

It will be a completely new package implemented in WebComponents.
This will allow this modal to be used in a variety of environments without depending on a framework.

## Phase 4
...
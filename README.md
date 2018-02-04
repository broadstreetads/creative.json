# creative.json

A standard for rich creative definitions.

## Overview

The goal of this project is to create a standard for defining rich media objects
including, but not limited to, digital ad creatives. The reasons that a
universal standard may be desirable include:

* Simplified, manual or automated exachange of creatives between agencies
  and digital platforms. Eg, answer "what are the specs?" for both people and
  machines.
* Defined creative properties, or viewed from another angle, inputs, which allow
  manual or automatic reconfiguration of a creative's properties, perhaps
  machine learning or artificial intellligence. For example, a product ad could
  be dynamically reconfigured to display different products depending on any
  number of contextual hints or user traits.
  Platforms today achieve this through closed, clumsy, and proprietary means.
* The ability to validate and verify limits on a creative's final file size,
  perhaps ameliorating one of several the major concerns of digital ad industry
  critics.

## Thoughts on Separation of Concerns

Delivery of rich creatives can be divided into several major components

* Delivery (Adserver or CDN)
* Creative Compilation / Configuration
* Reporting / Analytics

Broadstreet attempted all three. Paper G / Thunder attempted creative
compilation AND reporting. Of course, they're criticised for reporting that
can't be customized.

Creatives must eventually allow pluggability. How far this system goes toward
pluggability requires thought, but:

* Delivery mechanism should be pluggable (maybe simple CDN delivery?)
* Reporting / analytics mechanism should be pluggable

Offload all non-core and risk/time-suck/cost-creating requirements to third
parties who want to play that game. Make formats as pluggable as possible.

## Usage

<a name="module_creative"></a>

## creative
Find and either replace or remove items from an array.

**Example**  
```js
> const creative = require('creative-json')

> let impl = JSON.parse(fs.readFileSync('sample-creatives/simple.json' ,'utf-8'))
> creative.validate(impl)
true

> const inputs = { name: 'Broadstreet Ads' }
> const impl = JSON.parse(fs.readFileSync('sample-creatives/simple.json' ,'utf-8'))
> creative.compile(impl, inputs)
<style>/* CSS: Broadstreet Ads *\/</style><div><!-- HTML:Broadstreet Ads --></div><script>// JS:Broadstreet Ads</script>
```

* [creative](#module_creative)
    * [~validate(creative)](#module_creative..validate) ⇒ <code>boolean</code>
    * [~compile(creative, inputs)](#module_creative..compile) ⇒ <code>string</code>

<a name="module_creative..validate"></a>

### creative~validate(creative) ⇒ <code>boolean</code>
Validate a creative implementation against a schema

**Kind**: inner method of [<code>creative</code>](#module_creative)  

| Param | Type | Description |
| --- | --- | --- |
| creative | <code>creative</code> | The input creative object |

<a name="module_creative..compile"></a>

### creative~compile(creative, inputs) ⇒ <code>string</code>
Compile a creative to HTML given inputs

**Kind**: inner method of [<code>creative</code>](#module_creative)  
**Returns**: <code>string</code> - - HTML  

| Param | Type | Description |
| --- | --- | --- |
| creative | <code>creative</code> | the creative |
| inputs | <code>inputs</code> | the input hash |


## Schema Definition

%%schema%%

## Interesting

Article, comments are good too: https://adexchanger.com/data-driven-thinking/everyone-trying-kill-rich-media/
https://www.makethunder.com/about

* * *

&copy; 2018 Broadstreet Ads \<frontdesk@broadstreetads.com\>.
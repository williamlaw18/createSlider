# CreateSlider

A super simple slider with all the basic functionality a slider needs!

## Installation
Just run `npm i createslider` and require the function in your file

## Usage
Theres only the singular `createSlider()` function that can take the following parameters in order


Parameter | Functionality | Type | Default value |
-------- | ----- | ---- | ---- |
Wrapper | targets the wrapper around your slide | DOM Object | 
Items Per Slide | number of items per slide | integer | 1
Autoplay | toggles autoplay | bool | false
Autoplay Interval | interval between slide change (ms) | integer | 4000
Quick Nav | toggles visibility of quick navigation dots | bool | true
Arrows | toggles visibility of Next and Prev slide buttons | bool | true

## Example

````
<div id="wrapper">
	<div>1</div>
	<div>2</div>
	<div>3</div>
	<div>4</div>
	<div>5</div>
</div>

const sliderWrapper = document.getElementById('wrapper');

createSlider( sliderWrapper, 2 , true , 5000 , true , false );
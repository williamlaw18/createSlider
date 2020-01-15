# CreateSlider

A super simple slider with all the basic functionality a slider needs!

## Installation
Just run `npm i createslider` and require the function in your file

## Usage
Theres only the singular `createSlider()` function that can take the following parameters passed as an object


Parameter | Functionality | Type | Default value |
-------- | ----- | ---- | ---- |
slider | targets the wrapper around your slide | DOM Object | 
itemsPerSlide | number of items per slide | integer | 1
draggableBool | toggles the ability to drag the slides with mouse or touch | bool | true
autoplayBool | toggles autoplay | bool | false
dotsBool | toggles visibility of quick navigation dots | bool | true
arrowsBool | toggles visibility of Next and Prev slide buttons | bool | true
autoplayInterval | interval between slide change (ms) | integer | 4000

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

createSlider({
  slider: sliderWrapper,
  autoplayBool: true,
  itemsPerSlide: 2,
});
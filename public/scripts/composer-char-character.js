$(document).ready(function() {

  $('.new-tweet form textarea').on('keyup', function(event){
   // console.log($(this));
  //console.log($(this).val())

    const maxCharac = 140;

    const $currentCharac = $(this).val().length;
    //console.log(currentCharac);
    const characRemaining = maxCharac - $currentCharac;
    console.log(characRemaining);

    let $counterDisplay = $(this).parent().find('span');
    console.log($counterDisplay);

    $counterDisplay.text(characRemaining);

    //const colorCounter =

    characRemaining < 0 ? $counterDisplay.addClass('red') : $counterDisplay.removeClass('red');

    // if(characRemaining < 0){
    //   console.log("below zero")
    // } else {
    //   console.log("above Zero")
    // }


  });
  // --- our code goes here ---
});
document.addEventListener("DOMContentLoaded", function(event) {
  var checkboxArray = Sizzle('.app-filter__input');
  var filterObj = {
    windows_phone: true,
    android: true,
    ios: true
  }
  var filterItems = function(){
    checkboxArray.forEach(function(checkbox){
      filterObj[checkbox.dataset.device] = checkbox.checked;
    });
    var thumbnailArray = Sizzle('.app__thumbnail');

    thumbnailArray.forEach(function(thumbnail){
      var visible = Object.keys(filterObj).some(function(key){
        if(filterObj[key]){
          return thumbnail.classList.contains(key);
        } else {
          return false;
        }
      });
      if(visible){
        thumbnail.classList.remove('hidden');
      } else {
        thumbnail.classList.add('hidden');
      }
    });

    // if(filterString.trim() != ''){
    //   console.log(filterString)
    //   console.log(Sizzle('.app__thumbnail:not('+filterString+')'));
    // }
  }
  checkboxArray.forEach(function(checkbox){

    checkbox.onchange=function(){
      filterItems();
      // if (checkbox.checked) {
      //   Sizzle('.'+checkbox.dataset.device).forEach(function(appItem){
      //     appItem.classList.remove('hidden');
      //   });
      // } else {
      //   Sizzle('.'+checkbox.dataset.device).forEach(function(appItem){
      //     appItem.classList.add('hidden');
      //   });
      // }
    };

    // if (checkbox.checked){
    //
    //   var deviceTag = Sizzle(checkbox.dataset.device);
    //
    //
    // }

  });
});

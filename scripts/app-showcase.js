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
  }
  checkboxArray.forEach(function(checkbox){
    checkbox.onchange=function(){
      filterItems();
    };
  });
});

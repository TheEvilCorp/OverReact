import CreateBox from './widgetHelpers/createBox';
import CreateInput from './widgetHelpers/createInput';
import CreateDeleteBtn from './widgetHelpers/createDeleteBtn';
import AlsoResizeChildren from './widgetHelpers/alsoResizeChildren';
import GenerateNames from './widgetHelpers/generateNamesArr';

export default function() {

  //make overReact-container droppable
  $('#overReact-container').droppable({
    greedy: true,
    drop( e, ui ) {
      //escape out if dropping into same div
      const droppedInto = $(this);
      if(droppedInto.attr('id') === ui.draggable.parent()[0].id) return;
      $(ui.draggable).css({
        top: ui.draggable.offset().top - droppedInto.offset().top,
        left: ui.draggable.offset().left - droppedInto.offset().left,
      });
      //append the div that is being dragged into the div that will be its parent
      ui.draggable.appendTo(droppedInto);
      //re-set all divs resizable to also resize their children
      AlsoResizeChildren($('#overReact-container'));
       //change parent name of "nested in: "
      $(ui.draggable).children('div').children('p').text('nested in: App')
    }
  });
  //component name array to keep track of names and prevent duplication
  // var savedTemplate = [];

  //create input field on the main gui header
  CreateInput('gui-header', createComponent);

  //add save and load stuffs
  // $('#saveButton').on('click',function(e){
  //   savedTemplate = GenerateNames();
  // });
  //
  // $('#loadButton').on('click',function(e){
  //   $('.box').remove();
  //   savedTemplate.objects.forEach(function(item){
  //     createComponent(item, true);
  //   });
  // });

  //node parameter is the form dom element
  function createComponent(node, fromLoadButton) {
    //get the value of the input field & the name of the parent component
    let componentName = fromLoadButton ? node.name : node.find('input').val();

    //backup validation of componentName
    if((/[^\w]/g).test(componentName)) {
      componentName = componentName.replace(/[^\w]/g, '');
    }

    if(GenerateNames().names.indexOf(componentName) !== -1 || componentName === "App") {
      node.find('input').val('');
      $('#dup-warning').css('display', 'inline-block');
      //alert('React does not allow duplicate component names');
    } else {
        //clear out the input field
        if (!fromLoadButton) node.find('input').val('');

        //create a new box
        mixpanel.track('Create Component');
        CreateBox(componentName, node, fromLoadButton);

        //create Delete Button
        CreateDeleteBtn(componentName);
      }
  }
};

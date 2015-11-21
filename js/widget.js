    $(function() {

      //create button & input field on the main container
      createButtonAndInput('container', createComponent);
      createSubmitButton();

      //component name array to keep track of names and prevent duplication
      var allNames = [];

      function createBox(boxName, context) {
        context = $('#' + context);
        console.log(context);
       $('<div class="box"><div>').attr('id', boxName).text(boxName)
          .appendTo(context)
          .draggable({
            containment: '#' + context[0].id,
            // preventCollision: true,
          })
          .resizable({
            containment: '#' + context[0].id
          });  //{containment: '#mainContainer'}
        $('#' + boxName).css({
          height: context.height() * 0.30,
          width: context.width() * 0.75,
          top: context.css('top') + 25,
          left: context.css('left') + 25,
        });
      }

      function createButtonAndInput(context, func){
        var inputField = $('<form><input placeholder="component name..."></input></form>');
        inputField.appendTo('#' + context);
        inputField.css({
          float: 'right'
        });
        inputField.on('submit', function(e){
          e.preventDefault();
          func($(this));
        });
      }

      function createComponent(node){
        //getting the value of the input field & the name of the parent component
        var componentName = node.find('input').val();
        var parentName = node.parent().attr('id');

        //validate the user input
        if(componentName === '') {
          alert('enter a component name!');
        } else if(allNames.indexOf(componentName) !== -1) {
          alert('duplicate name');
        } else {
          //push the component name to an array in order to keep track of names & prevent dups
          allNames.push(componentName);

          //clear out the input field - NEED TO FIX THIS (REMOVED ID FROM NEW INPUT FIELD)
          node.find('input').val('');

          //create a new box
          createBox(componentName, parentName);

          //create a new button & input field
          createButtonAndInput(componentName, createComponent);

        } //closes else statement
        console.log(allNames);
      }

      var big = [];
      for( var i = 0; i < 200; i ++) {
        big.push({name: 'hello' + i, children: []});
      }
      // //WORKING ON THIS TO PROCESS DATA OBJECT**************
      var component = {
        name: 'Container',
        children: [
          {name: 'PokeList1', children: [{name: 'PokeItem1', children: []}, {
            name: 'Pokedex1',
            children: [
              {name: 'PokeList2', children: [{name: 'PokeItem2', children: []}]}, {name: 'Pokemon1', children: []}]
          }, {
            name: 'Pokedex2',
            children: [
              {name: 'PokeList3', children: [{name: 'PokeItem3', children: []}]}, {name: 'Pokemon3', children: []}]
          }]}, {name: 'Pokemon4', children: big}]
      };



      function setUpData() {
        $.ajax({
          method: 'POST',
          url: 'http://localhost:3000/submit',
          contentType: 'application/json',
          data: JSON.stringify({
            projectName: 'OverReact',
            main: component}),
          success: function(){
            window.location.href = "/download";
          },
          error: function(err){
            console.log('ERROR: ', err);
          }
        });
      }


      // AFTER SETUPDATA FUNCTION IS DONE, NEED TO ADD ON CLICK LISTENER TO THIS FUNCTION
      function createSubmitButton(){
        var submitButton = $('<div></div>').attr('id', 'submitButton');
        submitButton.text('CREATE FILES!');
        submitButton.appendTo('body');
        submitButton.on('click', setUpData);
        submitButton.css({
          position: 'fixed',
          display: 'inline'
        });
      }

    }); //closes anon function

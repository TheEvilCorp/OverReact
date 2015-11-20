    $(function() {

      //create button & input field on the main container
      $('#container').text('MAIN CONTAINER')
      createButtonAndInput('container', createComponent);
      createSubmitButton();

      //component name array to keep track of names and prevent duplication
      var allNames = [];

      function createBox(boxName, context) {
       $('<div class="box"><div>').attr('id', boxName).text(boxName)
          .appendTo('#' + context)
          .draggable({
            containment: '#' + context,
            // preventCollision: true,
          })
          .resizable();  //{containment: '#mainContainer'}
      }

      function createButtonAndInput(context, func){
        var button = $('<div></div>').addClass('boxButton')
        button.text('CREATE CHILD')
        button.on('click', func);
        button.appendTo('#' + context);

        var inputField = $('<input placeholder="NAME YOUR COMPONENT"></input>')
        inputField.appendTo('#' + context);

      }

      function createComponent(){

        //getting the value of the input field & the name of the parent component
        var componentName = $(this).parent().find('input').val()
        var parentName = $(this).parent().attr('id')

        //validate the user input
        if(componentName === '') {
          alert('enter a component name!')
        } else if(allNames.indexOf(componentName) !== -1) {
          alert('duplicate name')
        } else {
          //push the component name to an array in order to keep track of names & prevent dups
          allNames.push(componentName);

          //clear out the input field - NEED TO FIX THIS (REMOVED ID FROM NEW INPUT FIELD)
          $('#' + parentName).find('input').val('');

          //create a new box
          createBox(componentName, parentName);

          //create a new button & input field
          createButtonAndInput(componentName, createComponent)

        } //closes else statement
        console.log(allNames)
      }

      var big = [];
      for( var i = 0; i < 200; i ++) {
        big.push({name: 'hello ' + i, children: []});
      }
      // //WORKING ON THIS TO PROCESS DATA OBJECT**************
      var component = {
        name: 'Pokedex',
        children: [
          {name: 'PokeList', children: [{name: 'PokeItem', children: []}, {
            name: 'Pokedex',
            children: [
              {name: 'PokeList', children: [{name: 'PokeItem', children: []}]}, {name: 'Pokemon', children: []}]
          }, {
            name: 'Pokedex',
            children: [
              {name: 'PokeList', children: [{name: 'PokeItem', children: []}]}, {name: 'Pokemon', children: []}]
          }]}, {name: 'Pokemon', children: big}]
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
      };

    }); //closes anon function

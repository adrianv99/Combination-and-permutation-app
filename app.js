var TypeOfProblem = {
    order: '',
    repetition: ''
}



function factorial (n) { 
	if (n == 0){ 
		return 1; 
	}
	return n * factorial (n-1); 
}



//render the user interface to make a form ===============================================================================
function SetForm (){

    if(document.getElementById("startButton")){
        let element = document.getElementById("startButton");
        element.parentNode.removeChild(element);
    }
      
    var template =  `
    <div class="row" id='form'>
      <div class="col-md-11">
        <div class="form-group">
          <label class="control-label">Number of objects from a set: </label>
          <input type="number" class="form-control" id="set" placeholder="Number of objects from a set">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-11">
        <div class="form-group">
          <label class="control-label">Number of objects out from the set (Subset): </label>
          <input type="number" class="form-control" id="subset" placeholder="Number of objects out from the set (Subset)">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-11">
        <div class="form-group">
          <button class="btn btn-primary form-control" onClick='Calculate()' >Calculate</button>
        </div>
      </div>
    </div>
  `;
    

    let main = document.getElementById("main");
    main.innerHTML = template;

}




//function that render user interface to show the result============================================================================
function Calculate (){

    const set = document.getElementById('set').value;
    const subset = document.getElementById('subset').value;
    var result = 0;
    var addToResult = '';

    if(set === '' || subset === ''){
        alert('Fill the whole form');
    }
    else{

        if(TypeOfProblem.order === 'Yes' && TypeOfProblem.repetition === 'Yes'){

            //implementing    n^r   formula.
            result = set ** subset;
            addToResult = ' possible permutations';
    
        }
        else if(TypeOfProblem.order === 'Yes' && TypeOfProblem.repetition === 'No'){
    
            //implementing    n! / (n - r)!   formula.
            let n = factorial(set);
            let r = factorial(set - subset);
            result = n/r; 
            addToResult = ' possible permutations';
    
        }
        else if(TypeOfProblem.order === 'No' && TypeOfProblem.repetition === 'No'){
    
            //implementing    n! / r!(n - r)!   formula (binomial coefficient).
            let n = factorial(set);
            let r = factorial(set - subset);
            let product = factorial(subset) * r;
            result = n / product;
            addToResult = ' possible combinations';
    
        }
        else if(TypeOfProblem.order === 'No' && TypeOfProblem.repetition === 'Yes'){
    
            //implementing    (n + r - 1)! / r!(n - 1)!   formula.
            let a = factorial(parseInt(set) + parseInt(subset) - 1);
            let x = factorial(set - 1);
            let product = factorial(subset) * x;
            result = a / product;
            addToResult = ' possible combinations';
    
        }
        
        TypeOfProblem.order = '';
        TypeOfProblem.repetition = '';
    
        let form = document.getElementById("form");
        form.parentNode.removeChild(form);
    
        template = `
        <h2 class="text-center ">Result: `+result+ addToResult+` </h2>
        <div class="text-center py-5">
            <button class="btn btn-lg btn-danger px-5" data-toggle="modal" data-target="#OrderModal">Try again!</button>
        </div>
        `;
        let main = document.getElementById("main");
        main.innerHTML = template;
    }

    

}




//This function will decide if is a combination or permutation problem, and wich formula it will use============================
function chooseProblem (answer){

    if(TypeOfProblem.order === ''){
        TypeOfProblem.order = answer;
        $('#OrderModal').modal('hide');
        $('#RepetitionModal').modal('show');
    }
    else{
        TypeOfProblem.repetition = answer;
        $('#RepetitionModal').modal('hide');
        SetForm();
    }

}


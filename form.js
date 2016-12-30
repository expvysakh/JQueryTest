
$(document).ready(function () {
    
    $("#total").prop('disabled',true); 

    $(":input").not("[name=new]").prop("disabled", true);
    var emp_ids = new Array();
    var emps = new Array();
    var flag = true;


    $("#new").click(function (e) { 

      $(":input").not("[name=total]").prop("disabled", false); 

     })
 
    $(".sav").click(function (e) {
       
        $.validator.setDefaults({
        debug: true,
        success: "valid"
        });
        $( "#register" ).validate({
        rules: {
            id: {
            required: true,
            maxlength: 4
            },
        name: {
            required: true,
            maxlength: 50
            },
        desi:{
             required: true,
             maxlength: 50
            },   
        
        bp:{
             required: true,
             maxlength: 10,
             number: true
            },  
        da:{
            required: true,
            maxlength: 10,
            number: true
        },  
        hra:{
             required: true,
             maxlength: 10,
             number: true
            },  
        med:{
             required: true,
             maxlength: 10,
             number: true      
        },            

        }
        });

         var validate = true;
        // $(":input").not("[name=total]").each(function () {
        //     if (!$(this).val()) {
        //         alert('Some fields are empty');
        //         validate = false;
        //     }

        // });


        if (validate) {

            // validating empid
             //Checking duplication of eid  
            var id = $('#id').val();
            $.each(emp_ids, function (index, value) {
                console.log(value);
                if (id === value) {
                    flag = false;
                }
            });

            if (flag) {

                emp_ids.push(id);

                e.preventDefault();
                var id = $('#id').val();
                var name = $('#name').val();
                var desi = $('#desi').val();
               
                var bp = $("#bp").val(); 
                var da = $("#da").val(); 
                var hra = $("#hra").val(); 
                var med = $("#med").val(); 
               
                $("#total").prop('disabled',false); 
               
                $('#total').val(parseInt($('#bp').val()) + parseInt($('#da').val()) + parseInt($('#hra').val()) + parseInt($('#med').val())); 
                var total = parseInt(bp)+ parseInt(da)+parseInt(hra)+parseInt(med);
                console.log(bp);
                console.log(da);
                console.log(hra);
                console.log(med);
               
                var total = $("#total").val();
                emp = {"id":id,"name":name,"designation":desi,"bp":bp,"da":da,"hra":hra,"med":med,"total":total};
                emps.push(emp);
                 

                 $("#tablebody").append('<tr><td class="ids">' + id + '</td><td>' + name + '</td><td>' + desi + '</td><td>' + total +
                 '</td><td>'+'<button type="button" class ="buttontest" id ="edit" onclick="abc()" name = "edit">Edit</button><button type="button" class="deleteclass btn btn-danger" id = "delete" name = "delete">delete</button>' +'</td><tr');

                  $( "#dialog-message" ).dialog(
                    {
                    modal: true,
                    buttons: {
                        Ok: function() {
                        $( this ).dialog( "close" );
                        }
                    }
                    });           
           
                validate = false;
                //clear();
                 $("#register").trigger('reset');

            }
            else {
                
                alert('Employee id already exist');
                flag = true;
            }
        }

    })

  
    // Clear buttom
    $("#cancel").click(function () {
        $("#register").trigger('reset');
    })

     

    

    
}); 

function abc()
{
        alert(2);
        console.log($('.buttontest').parent().siblings().filter(".ids").text());
}


  

 
  


   function clear() {
    $('#empid').val('');
    $('#name').val('');
    $('#data').val('');
    $('#dept').val('');
   }

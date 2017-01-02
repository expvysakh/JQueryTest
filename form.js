
$(document).ready(function () {
    
    $("#total").prop('disabled',true); 

    $(":input").not("[name=new]").prop("disabled", true);
    var emp_ids = new Array();
    var emps = new Array();
    var flag = true;


    $("#new").click(function (e) { 

      $(":input").not("[name=total]").prop("disabled", false); 

     })
 
    $("#save").click(function (e) {
       
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
         invalidHandler: function(form, validator) {
            alert('invalidHandler');
        }          

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
               
               // $("#total").prop('disabled',false); 
                //$('#total').val(parseInt($('#bp').val()) + parseInt($('#da').val()) + parseInt($('#hra').val()) + parseInt($('#med').val())); 
                
                var total = parseInt(bp)+ parseInt(da)+parseInt(hra)+parseInt(med);
                $('#total').val(total);
                console.log(bp);
                console.log(da);
                console.log(hra);
                console.log(med);

                $("#med").change(function(){
                var total = parseInt(bp)+ parseInt(da)+parseInt(hra)+parseInt(med);
                $('#total').val(total);
                });
               
                var total = $("#total").val();
                emp = {"id":id,"name":name,"designation":desi,"bp":bp,"da":da,"hra":hra,"med":med,"total":total};
                emps.push(emp);
                
                var myjson=JSON.stringify(emps);
                localStorage.setItem(001, myjson); 
                
                 $("#tablebody").append('<tr><td class="ids">' + id + '</td><td class = "names">' + name + '</td><td class="desi">' + desi + '</td><td>' + total +
                 '</td><td>'+'<button type="button" class ="edit btn btn-danger" name = "edit">Edit</button><button type="button" class="delete btn btn-danger" name = "delete">delete</button>' +'</td><tr');

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

     //delete button  
     $('#tabid').on('click', '.delete', function(){
        if(confirm("Are you sure you want to delete?")){
            $(this).closest ('tr').remove ();}
    });

     //edit function

    $('#tabid').on('click', '.edit', function(){
    
    var empid =  $('.edit').parent().siblings().filter(".ids").text();
    console.log("this"+empid);              
    $('#id').val($(this).parent().siblings().filter(".ids").text());
    $('#name').val($(this).parent().parent().find('.names').text());
    $('#desi').val($(this).parent().parent().find('.desi').text());
    
    $.each(emps, function (index, value) {
    
        if (empid === value.id) {
            $('#bp').val(value.bp);
            $('#da').val(value.da);
            $('#hra').val(value.hra);
            $('#med').val(value.med);
            $('#total').val(value.total);   
            
        }
    }); 

            
          $(this).closest ('tr').remove ();      
         

 });
    

    
}); 

   function clear() {
    $('#empid').val('');
    $('#name').val('');
    $('#data').val('');
    $('#dept').val('');
   }

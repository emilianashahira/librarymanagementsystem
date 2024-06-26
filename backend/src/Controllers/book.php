<?php 

use Slim\Http\Request; //namespace 
use Slim\Http\Response; //namespace 

//include adminProc.php file 
include __DIR__ .'/function/bookProc.php';
include __DIR__ .'/function/studentProc.php';


//alow cors
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
//end



// FOR BOOK

//read table book 
$app->get('/book', function (Request $request, Response $response, array $arg){

    return $this->response->withJson(array('data' => 'success'), 200); });  
 
// read all data from table book 
$app->get('/allbook',function (Request $request, Response $response,  array $arg) { 

    $data = getAllbook($this->db); 
    if (is_null($data)) { 

        return $this->response->withHeader('Access-Control-Allow-Origin', '*')->withJson(array('error' => 'no data'), 404); 
} 
    return $this->response->withJson(array('data' => $data), 200); }); 


// Fetch bookTitle from table book
$app->get('/bookTitle', function (Request $request, Response $response, array $arg) { 

    $data = getBookTitle($this->db); 
    if (is_null($data)) { 

        return $this->response->withHeader('Access-Control-Allow-Origin', '*')->withJson(array('error' => 'no data'), 404); 
    } 
    return $this->response->withJson(array('data' => $data), 200); 
}); 

//request table order by condition (book id) 
$app->get('/book/[{id}]', function ($request, $response, $args){   
    $bookId = $args['id']; 
    if (!is_numeric($bookId)) { 

        return $this->response->withJson(array('error' => 'numeric paremeter required'), 500);  
} 
    $data = getbook($this->db, $bookId); 
    if (empty($data)) { 

        return $this->response->withJson(array('error' => 'no data'), 500); 
} 

return $this->response->withJson(array('data' => $data), 200);});

//post method order
$app->post('/book/add', function ($request, $response, $args) { 

    $form_data = $request->getParsedBody(); 
    $data = createbook($this->db, $form_data); 
    if (is_null($data)) { 

        return $this->response->withHeader('Access-Control-Allow-Origin', '*')->withJson(array('error' => 'no data'), 404); 
} 
    return $this->response->withJson(array('data' => $data), 200); }); 


//delete row Orderr
$app->delete('/book/del/[{id}]', function ($request, $response, $args){   
    $bookId = $args['id']; 
    
   if (!is_numeric($bookId)) { 

       return $this->response->withJson(array('error' => 'numeric paremeter required'), 422); } 
       $data = deletebook($this->db,$bookId); 
       if (empty($data)) { 

           return $this->response->withJson(array($bookId=> 'is successfully deleted'), 202);}; }); 
 

   
//put table order 
$app->put('/book/put/[{id}]', function ($request, $response, $args){
    $bookId = $args['id']; 
    
    if (!is_numeric($bookId)) { 
        
        return $this->response->withJson(array('error' => 'numeric paremeter required'), 422); } 
        $form_dat=$request->getParsedBody(); 
        $data=updatebook($this->db,$form_dat,$bookId); 
        if ($data <=0)
        return $this->response->withJson(array('data' => 'successfully updated'), 200); 
});





// FOR STUDENT

//read table student 
$app->get('/student', function (Request $request, Response $response, array $arg){

    return $this->response->withJson(array('data' => 'success'), 200); });  
 
// read all data from table student 
$app->get('/allstudent',function (Request $request, Response $response,  array $arg) { 

    $data = getAllstudent($this->db); 
    if (is_null($data)) { 

        return $this->response->withHeader('Access-Control-Allow-Origin', '*')->withJson(array('error' => 'no data'), 404); 
} 
    return $this->response->withJson(array('data' => $data), 200); }); 

//request table order by condition (student id) 
$app->get('/student/[{id}]', function ($request, $response, $args){   
    $studentId = $args['id']; 
    if (!is_numeric($studentId)) { 

        return $this->response->withJson(array('error' => 'numeric paremeter required'), 500);  
} 
    $data = getstudent($this->db, $studentId); 
    if (empty($data)) { 

        return $this->response->withJson(array('error' => 'no data'), 500); 
} 

return $this->response->withJson(array('data' => $data), 200);});

//post method order
$app->post('/student/add', function ($request, $response, $args) { 

    $form_data = $request->getParsedBody(); 
    $data = createstudent($this->db, $form_data); 
    if (is_null($data)) { 

        return $this->response->withHeader('Access-Control-Allow-Origin', '*')->withJson(array('error' => 'no data'), 404); 
} 
    return $this->response->withJson(array('data' => $data), 200); }); 


//delete row Order
$app->delete('/student/del/[{id}]', function ($request, $response, $args){   
    $studentId = $args['id']; 
    
   if (!is_numeric($studentId)) { 

       return $this->response->withJson(array('error' => 'numeric paremeter required'), 422); } 
       $data = deletestudent($this->db,$studentId); 
       if (empty($data)) { 

           return $this->response->withJson(array($studentId=> 'is successfully deleted'), 202);}; }); 
 

   
//put table order 
$app->put('/student/put/[{id}]', function ($request, $response, $args){
    $studentId = $args['id']; 
    
    if (!is_numeric($studentId)) { 
        
        return $this->response->withJson(array('error' => 'numeric paremeter required'), 422); } 
        $form_dat=$request->getParsedBody(); 
        $data=updatestudent($this->db,$form_dat,$studentId); 
        if ($data <=0)
        return $this->response->withJson(array('data' => 'successfully updated'), 200); 
});
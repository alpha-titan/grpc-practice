/*
	!Steps to follow for creating the gRPC Server;
	?1 create a proto file with the specified service using protocol buffers;
	?2 load the file to create the service definitions --> two methods --> static generated service(protoc) aor dynamic generated service
	!Note: We are using dynamic generated service because javascript is dynmaically typed language, sevices are generated on the fly unlike STL []
	?3 create a credential
	?4 create a new intance of the server
	?5 add the service definitions to the serve and also add the corresponding implememtatio of the service
	?6 bind the server and load the credentials
	?7 start the server
*/
// const path = require("path");
const PROTO_PATH = "../protos/employee/employee.proto"; //?  Set the proto path
const PORT = 4000;
let employees = require("./employees");
const grpc = require("grpc"); //? Require the grpc
const serviceDef = grpc.load(PROTO_PATH); //? Load the service definition by adding the PROTO_PATH
// console.log(serviceDef);
const cred = grpc.ServerCredentials.createInsecure(); //! This is a Insecure Connection --> Not good for production --> Create Certificate
const server = new grpc.Server(); //?  get an instance of the server
console.log(serviceDef);
server.addService(serviceDef.employees.EmployeeService.service, {
	addEmployee: addEmployee,
	deleteEmployee: deleteEmployee,
	editEmployee: editEmployee,
	getAllEmployee: getAllEmployee,
}); //? Adding the service definition to the server, and mapping the implementation of the service
server.bind(`0.0.0.0:${PORT}`, cred); //? Finally binding the server to listen from the localhost and given port, and also passing the cred
server.start();
function addEmployee(call, callback) {
	const employee = call.request.employee;
	// console.log(employee);
	employees.push(employee);
	console.log(employees);
	callback(null, { employee });
}

function deleteEmployee(call, callback) {
	// console.log(call);
	console.log(call.request.firstName);
	const firstName = call.request.firstName;
	employees = employees.filter((e) => e.firstName !== firstName);
	callback(null, { employee: { firstName } });
}

function getAllEmployee(call) {
	//? We are not specifying call back beacuse we are streaming the data
	console.log(call);
	callback("error");
}

function editEmployee(call, callback) {
	console.log(call);
	callback("error");
}

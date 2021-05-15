const PROTO_PATH = "../protos/employee/employee.proto"; //?  Set the proto path;
const PORT = 4000;
const grpc = require("grpc"); //? Require the grpc;
const faker = require("faker");
const serviceDef = grpc.load(PROTO_PATH); //? Load the service definition by adding the PROTO_PATH;
const cred = grpc.credentials.createInsecure(); //! This is a Insecure Connection --> Not good for production --> Create Certificate

// console.log(serviceDef);

const client = new serviceDef.employees.EmployeeService(
	`0.0.0.0:${PORT}`,
	cred
);

const option = parseInt(process.argv[2]);
switch (option) {
	case 1:
		addEmployee(client);
		break;
	case 2:
		deleteEmployee(client);
		break;
	default:
		console.log("Invalid");
		break;
}

/*
	? set metadata
	?const md = new grpc.Metadata();
	?md.add("username", "sachin_ak");
	?md.add("password", "password");
*/

function addEmployee(client) {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const salary = 300000;
	console.log({ firstName, lastName });
	const employee = {
		firstName: firstName,
		lastName: lastName,
		salary: salary,
		age: 21,
	};
	client.addEmployee({ employee }, function (err, response) {
		if (err) console.log(err);
		console.log(response);
	});
}

function deleteEmployee(client) {
	client.deleteEmployee({ firstName: "Kory" }, (err, response) => {
		if (err) console.log(err);
		else console.log(response);
	});
}

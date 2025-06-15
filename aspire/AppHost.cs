var builder = DistributedApplication.CreateBuilder(args);

var password = builder.AddParameter("db-password", secret: true);

var postgres = builder.AddPostgres("postgres", password: password)
	.WithDataVolume()
	.WithEndpoint("tcp", endpoint => endpoint.Port = 5432);

var db = postgres.AddDatabase("invite-flow");

// var api = builder.AddNpmApp("api", "../api", "dev")
// 	.WithExternalHttpEndpoints()
// 	.WithHttpsEndpoint(port: 5001, targetPort: 3333)
// 	.WithReference(db)
// 	.PublishAsDockerFile();

builder.AddNpmApp("web", "../web", "dev")
	.WithExternalHttpEndpoints()
	.WithHttpsEndpoint(port: 5002, targetPort: 3000)
	.PublishAsDockerFile();
	
builder.Build().Run();
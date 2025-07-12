var builder = DistributedApplication.CreateBuilder(args);

var dbPassword = builder.AddParameter("db-password", secret: true);

var postgres = builder.AddPostgres("postgres", password: dbPassword)
	.WithEndpoint("tcp", endpoint => endpoint.Port = 5432)
    .WithDataVolume();

var db = postgres.AddDatabase("invite-flow");
var testDb = postgres.AddDatabase("invite-flow-test");

builder.AddNpmApp("web", "../web", "dev")
	.WithExternalHttpEndpoints()
    .WithReference(db)
	.WithReference(testDb)
	.WithEnvironment("API_URL", "http://localhost:3333")
	.WithHttpsEndpoint(port: 5002, targetPort: 3000)
	.PublishAsDockerFile();

builder.Build().Run();
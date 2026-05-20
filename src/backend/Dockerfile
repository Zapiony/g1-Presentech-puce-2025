# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy solution and project files first to leverage Docker cache for restoring dependencies
COPY Presentech.slnx ./
COPY Presentech.Api/Presentech.Api.csproj Presentech.Api/
COPY Presentech.Business/Presentech.Business.csproj Presentech.Business/
COPY Presentech.DataAccess/Presentech.DataAccess.csproj Presentech.DataAccess/
COPY Presentech.DataManagement/Presentech.DataManagement.csproj Presentech.DataManagement/

# Restore dependencies
RUN dotnet restore Presentech.Api/Presentech.Api.csproj

# Copy all remaining source files
COPY . .

# Build and publish the release build
WORKDIR /app/Presentech.Api
RUN dotnet publish -c Release -o /out

# Stage 2: Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /out .

# Expose default HTTP port
EXPOSE 8080
EXPOSE 8081

# Tell ASP.NET Core to listen on port 8080
ENV ASPNETCORE_URLS=http://+:8080
# Set environment to Production by default for container deployments
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "Presentech.Api.dll"]

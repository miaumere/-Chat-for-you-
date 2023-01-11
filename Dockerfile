#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM ubuntu:22.04 AS runtime
# Install ASP.NET Runtime
RUN apt-get update
RUN apt-get install -y wget
RUN wget https://packages.microsoft.com/config/ubuntu/20.10/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
RUN dpkg -i packages-microsoft-prod.deb
RUN apt-get update
RUN apt-get install -y apt-transport-https
RUN apt-get install -y aspnetcore-runtime-7.0

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS publish
WORKDIR /build-tools
RUN apt-get update
RUN apt-get upgrade -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install nodejs

FROM publish AS publish-api
ARG CACHEBUST=1
WORKDIR /src
COPY ["./Chat.API", "./"]
RUN dotnet publish "Chat.API.csproj" -c Release -o /app/publish

FROM publish AS publish-frontend
ARG CACHEBUST=1
WORKDIR /src
COPY ["./Chat.Frontend", "./"]
RUN npm run build:prod
RUN mkdir /app
RUN mkdir /app/publish
RUN cp -fr ./dist/* /app/publish

FROM runtime AS final
WORKDIR /app
COPY --from=publish-api /app/publish .
COPY --from=publish-frontend /app/publish ./wwwroot
CMD ["dotnet", "Chat.API.dll"]

# Build stage: compila o jar com Maven.
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B dependency:go-offline
COPY src ./src
RUN mvn -B clean package -DskipTests

# Runtime stage: só o JRE + o jar, sem toolchain de build na imagem final.
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Serviços web no Render recebem a porta a escutar via $PORT (application.yml mapeia
# server.port pra essa variável); localmente cai no padrão 8080.
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

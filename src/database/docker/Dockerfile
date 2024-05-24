FROM docker.io/bitnami/postgresql:14

USER 1001

COPY --chown=1001 server.key /opt/bitnami/postgresql/certs/server.key 
COPY --chown=1001 server.crt /opt/bitnami/postgresql/certs/server.crt 

RUN chmod 600 /opt/bitnami/postgresql/certs/server.key
RUN chown 1001 /opt/bitnami/postgresql/certs/server.key
USER 1001


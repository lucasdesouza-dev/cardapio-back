# versao
FROM node:19-slim 
#pasta de execuçao
WORKDIR /home/node/app


#manter docker sempre em execução
CMD [ "tail","-f","/dev/null" ]
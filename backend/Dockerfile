FROM python:3.7-alpine

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt

RUN mkdir -p /app/backend
WORKDIR /app/backend
COPY . /app/backend

RUN adduser -D user
RUN chown -R user:user .
RUN chmod -R 755 .
USER user

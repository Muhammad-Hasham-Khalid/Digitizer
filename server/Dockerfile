FROM ubuntu:20.04

RUN apt-get update -y
RUN apt-get install -y python3.8 build-essential
RUN apt-get install -y python3-pip

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN python3 -m pip install -r requirements.txt 

COPY . /app

ENTRYPOINT [ "python3.8" ]

CMD [ "app.py" ]

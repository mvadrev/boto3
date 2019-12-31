import csv
import boto3
import json

print("init..")

with open('credentials.csv','r',) as input: 
    next(input)
    reader = csv.reader(input)
    for line in reader:
        access_key_id = line[2]
        secret_access_key = line[3]

photo = 'k2.png'
neo2 = 'krishna.jpg'


client = boto3.client('rekognition',
                       aws_access_key_id = access_key_id,
                       aws_secret_access_key = secret_access_key,
                       region_name='us-east-1'
                       )

with open (photo, 'rb', ) as source_image:
    source_bytes = source_image.read()

with open (neo2, 'rb', ) as source_image:
    source_bytesx = source_image.read()


# responsex = client.describe_collection(
#     CollectionId='face26'
# )


# responsep = client.index_faces(
#     CollectionId='face26',
#     Image={'Bytes': source_bytesx},
#     ExternalImageId='Murali',
   
# )

# response = client.describe_collection(
#     CollectionId='face26'
# )

# print(response)

# list = client.list_faces(
#     CollectionId='face26'
# )

# print("====")
# print(list)


det = client.search_faces_by_image(
    CollectionId='face26',
    Image={'Bytes': source_bytesx},
    MaxFaces=1,
    
)
# print(">>>>>>>>>")
print("the detections are",json.dumps(det))
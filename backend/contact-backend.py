# Code for running on AWS lambda.

import json
import boto3
import botocore
import re

HEADERS = {
    'Access-Control-Allow-Origin': 'https://publiitest.t79.it',
    'Access-Control-Allow-Headers': '*'
}

MESSAGE_FIELDS = {
    'name',
    'email',
    'message',
    'consent'
}

verifyEmailRegex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'

def lambda_handler(event, context):
    
    body = json.loads(event['body'])

    if not all( field in body for field in MESSAGE_FIELDS ):
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps('Error: Did not receive all the fields.')
        }
        
    if not body['consent']:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps('Error: The message did not contain a positive consent.')
        }
        
    
    name = body['name']
    email = body['email']
    
    if name == '':
        name = 'Anonymous'
    
    # Checking if it is a valid email address.
    replayAddress = 'no-replay <no-replay@t79.it>'
    if (re.search(verifyEmailRegex, email)):
        replay = f'{name} <{email}>'
    
    # Get contact with the email service.
    sesClient = boto3.client('ses')
    
    # Try to send email
    try:
        response = sesClient.send_email(
            Source = 'The PubliiTest website <form-publiitest@t79.it>',
            Destination = {
                'ToAddresses': [
                        'PubliiTest owner <owner-publiitest@t79.it>'
                    ]
            },
            Message = {
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': 'Message from ' + name
                },
                'Body': {
                    'Text': {
                        'Charset': 'UTF-8',
                        'Data': body['message']
                    }
                }
            },
            ReplyToAddresses = [
                    replay
                ]
            )
            
    except botocore.exceptions.ClientError as error:
        print(error)
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps('Error: Got failure response from the email service.')
        }
    
    
    return {
        'statusCode': 200,
        'headers': HEADERS,
        'body': json.dumps('The email was sent.')
    }

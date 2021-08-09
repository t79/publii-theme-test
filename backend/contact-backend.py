# Code for running on AWS lambda.

import json
import boto3
import botocore

HEADERS = {
    'Access-Control-Allow-Origin': 'https://publiitest.t79.it',
    'Access-Control-Allow-Headers': '*'
}

def lambda_handler(event, context):
    
    body = json.loads(event['body'])

    if not 'name' in body:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps('The server did not get any name')
        }
        
    
    name = body['name']
    
    if name == '':
        name = 'Anonymous'
    
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
                        'Data': 'This is a test'
                    }
                }
            },
            ReplyToAddresses = [
                    'no-replay <no-replay@t79.it>'
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
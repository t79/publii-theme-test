# Code for running on AWS lambda.

import json

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

    return {
        'statusCode': 200,
        'headers': HEADERS,
        'body': json.dumps('Hi ' +  body['name'] + ', nice to see you.')
    }
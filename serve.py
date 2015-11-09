#! /usr/bin/env python2
from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer
import os


class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '')
        SimpleHTTPRequestHandler.end_headers(self)


if __name__ == '__main__':
    '''
    This script serves the umovie files, passing the CORS options in the headers.
    '''
    os.chdir(os.path.join(os.getcwd(), "umovie"))
    BaseHTTPServer.test(CORSRequestHandler, BaseHTTPServer.HTTPServer)

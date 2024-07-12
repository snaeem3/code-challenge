import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import ParseError


class Home(TemplateView):
    template_name = 'parserator_web/index.html'


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        # Returns the parsed components to the frontend.
        input_string = request.query_params.get('address', '')
        if not input_string:
            return Response({'error': 'No address provided'}, status=400)

        try:
            address_components, address_type = self.parse(input_string)
            return Response({
                'input_string': input_string,
                'address_components': address_components,
                'address_type': address_type
            })
        except usaddress.RepeatedLabelError as e:
            return Response({'error': 'Address could not be parsed', 'details': str(e)}, status=400)

    def parse(self, address):
        # Returns the parsed components of a given address using usaddress: https://github.com/datamade/usaddress
        try:
            parsed_address, address_type = usaddress.tag(address)
            address_components = dict(parsed_address)
            return address_components, address_type
        except usaddress.RepeatedLabelError as e:
            raise e

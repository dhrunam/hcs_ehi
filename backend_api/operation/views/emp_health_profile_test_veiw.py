from rest_framework import generics, response, status, views
from operation import models as op_models, serializers as op_serializers
from django.db import transaction, connection
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from datetime import datetime


class EmpHealthProfileTestList(generics.ListCreateAPIView):

    queryset = op_models.EmpHealthProfileTest.objects.all().order_by('-id')
    serializer_class = op_serializers.EmpHealthProfileTestSerializer

    # @transaction.atomic
    # def perform_create(self, serializer):
    #     self.request.data['created_by']= self.request.user.id
    #     instance=serializer.save()
    #     return instance
    def post(self, request, *args, **kwargs):

        print(request.data)
        request.data._mutable=True
        if(int(request.data['id']) <= 0):
            print('Insert:')
            request.data['created_by']= request.user.id

            result = self.create(request, *args, **kwargs)
        else:
            print('Update:')
            result = self._update(request, *args, **kwargs)
        request.data._mutable=False
        return result

    def get_queryset(self):
        queryset = super().get_queryset()
        employee = self.request.query_params.get('employee')
        session =  self.request.query_params.get('session')
        if employee : 
            queryset = queryset.filter(employee=employee)
        
        if session : 
            queryset = queryset.filter(medical_test_session=session)
            
        return queryset
    
    def _update(self , request, *args, **kwargs):

        model = op_models.EmpHealthProfileTest.objects.get(id=request.data['id'])
        if(model):
            model.location = request.data['location']
            model.reg_date = request.data['reg_date']
            model.collection_date = request.data['collection_date']
            model.ref_doctor = request.data['ref_doctor']
            model.sample_type = request.data['sample_type']
            model.analyst = request.data['analyst']
            model.created_by = request.user

            model.save()

            serialize_model = model_to_dict(model)

            return response.Response(serialize_model, status=status.HTTP_202_ACCEPTED)
    
        return response.Response("Data not found", status=status.HTTP_404_NOT_FOUND)
    
class EmpHealthProfileTestDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = op_models.EmpHealthProfileTest
    serializer_class = op_serializers.EmpHealthProfileTestSerializer

    def perform_update(self, serializer):
        self.request.data._mutable = True
        self.request.data['created_by']= self.request.user.id
        self.request.data._mutable = False
        return super().perform_update(serializer)
    
    def patch(self, request, *args, **kwargs):
        
        return self.partial_update(request, *args, **kwargs)    
    
class SessionwiseEmplistOfMedicalTestRecorded(generics.ListAPIView):
    queryset = op_models.EmpHealthProfileTest.objects.all().order_by('-id')
    serializer_class = op_serializers.EmpHealthProfileTestSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        year = self.request.query_params.get('year')
        session =  self.request.query_params.get('session')
        if year : 
            queryset = queryset.filter(medical_test_session__year=year)
        
        if session : 
            queryset = queryset.filter(medical_test_session__session__icontains=session)
            
        return queryset
    


class SingleSessionWiseSummary(views.APIView):
    def get(self, request):
        year = self.request.query_params.get('year')
        year = year if year else datetime.now().year
        session =  self.request.query_params.get('session')
        
        session = "%" + session + "%" if session else "%" + self.get_session(year) + "%"
        with connection.cursor() as cursor:
            cursor.execute(
                """ select * from
					(SELECT 
                    cast(count(*) as character varying(10)) as total_employee
                    from public.masters_employee as e
					) as d
                    cross join 
                    ( SELECT 
                    cast(coalesce(count(*),0) as character varying(10)) as total_tested_employee
                    from public.operation_emphealthprofiletest as t
                    join public.configuration_medicaltestsession as s on t.medical_test_session_id=s.id
                  	where s.year=%s and s.session ilike %s
					 ) as te
                    cross join
                    (select cast(%s as character varying(10)) as year  ) as y
                    cross join
                    (select  %s as session ) as s ; """,(year, session, year, session.replace('%','') ))
            columns = [col[0] for col in cursor.description]
            rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
            return response.Response(rows)
    
    def get_session(self, year):
        if datetime.now().month < 6:
            return "First Half"
        
        if datetime.now().month >12:
            return "Second Half"


class SessionWiseSummary(views.APIView):
    def get(self, request):
        year = self.request.query_params.get('year')
        year = year if year else datetime.now().year
        session =  self.request.query_params.get('session')
        session = "%" + session + "%" if session else "%" + 'First Half' + "%"
        with connection.cursor() as cursor:
            cursor.execute(
                """ select * from (
                SELECT  year, session, count(t.id) as emp_test_count
                FROM public.configuration_medicaltestsession as s
                left join public.operation_emphealthprofiletest as t on s.id = t.medical_test_session_id
                group by year, session
                ) as r
                cross join ( select count(id) as emp_count
                from public.masters_employee 
                ) as emp; """)
            columns = [col[0] for col in cursor.description]
            rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
            return response.Response(rows)

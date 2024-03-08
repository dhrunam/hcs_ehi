from django.urls import include, path
from operation import views as op_views

urlpatterns = [
    path('operation/health_profile_test', op_views.EmpHealthProfileTestList.as_view()),
    path('operation/health_profile_test/<int:pk>', op_views.EmpHealthProfileTestDetails.as_view()),
    
    path('operation/health_test', op_views.EmpHealthTestDetailsList.as_view()),
    path('operation/health_test/<int:pk>', op_views.EmpHealthTestDetailDetails.as_view()),

    path('operation/health_test/upload/report', op_views.EmpHealthTestReportsList.as_view()),
    # path('operation/health_test/upload/report/<int:pk>', op_views.EmpHealthTestReportsDetails.as_view()),

    path('operation/health_test/sessionwise/emp/list', op_views.SessionwiseEmplistOfMedicalTestRecorded.as_view()),
    path('operation/health_test/present_session/test/summary', op_views.SingleSessionWiseSummary.as_view()),
    path('operation/health_test/sessionwise/test/summary', op_views.SessionWiseSummary.as_view()),
    
]

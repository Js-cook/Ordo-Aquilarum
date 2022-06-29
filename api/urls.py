from django.urls import path
from . import views
urlpatterns = [
    path("", views.api_overview, name="overview"),
    path("retrieve-stats/<str:username>/", views.ind_stats, name="stats"),
    path("retrieve-all-stats/", views.all_stats, name="all-stats"),
    path("add-correct/<str:username>/", views.add_correct, name="add-correct"),
    path("add-incorrect/<str:username>/", views.add_incorrect, name="add-incorrect"),
    path("change-points/<str:username>/<int:amount>/", views.change_points, name="change-points"),
    path("subtract-points/<str:username>/<int:amount>/", views.subtract_points, name="subtract-points"),
    path("retrieve-question/<str:declension>/", views.retrieve, name="retrieve"),
    path("retrieve-others/<str:declension>/", views.retrieve_others, name="retrieve-others"),
    path("create-group/<str:name>/", views.new_group, name="create-group"),
    path("add-group/<str:gname>/<str:username>/", views.add_to_group, name="add-group"),
    path("retrieve-all-groups/", views.all_groups, name="all-groups"),
    path("retrieve-students/<str:name>/", views.retrieve_students, name="retrieve-students"),
    path("add-session/", views.create_session, name="create-session"),
    path("retrieve-sessions/<str:username>/", views.retrieve_sessions, name="retrieve-sessions"),
    path("add-multiplier/<str:username>/<int:amount>/", views.add_multiplier, name="add-multiplier"),
    path("add-insurance/<str:username>/<int:amount>/", views.add_insurance, name="add-insurance"),
    path("change-role/<str:username>/<str:role>/", views.change_role, name="change-role"),
    path("add-ques-incorrect/<str:qid>/", views.add_ques_incor, name="add-ques-incorrect"),
    path("get-top-ten/", views.get_top_ten, name="get-top-ten"),
    path("get-comp-users/", views.get_comp_users, name="get-comp-users"),
    path("add-comp-points/<str:username>/<int:amount>/", views.add_comp_points, name="add-comp-points"),
    path("subtract-comp-points/<str:username>/<int:amount>/", views.subtract_comp_points, name="subtract-comp-points"),
    path("add-comp-insurance/<str:username>/<int:amount>/", views.add_comp_insurance, name="add-comp-insurance"),
    path("add-comp-multiplier/<str:username>/<int:amount>/", views.add_comp_multiplier, name="add-comp-multiplier")
]
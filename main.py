# Given your birthday (potentially exact hour:minute:second too)
# Figures out your given life crises points assuming a 100 year lifespan
from datetime import datetime, timedelta
from pytz import timezone

# Assumed lifespan
# ex. quarter-life crisis at 25, mid-life crisis at 50
lifespan = 100.

birthday = datetime(1991, 8, 3) # year month day, (hour, minute, second)
birthday = timezone('US/Pacific').localize(birthday)
print("Your birthday:", birthday.strftime("%b %d, %Y %H:%M:%S"))

crises = dict()

crises['quarter'] = 0.25
crises['mid'] = 0.5
crises['three quarters'] = 0.75

crises['third'] = 1./3
crises['two thirds'] = 2./3

crises['fifth'] = 1./5
crises['two fifths'] = 2./5
crises['three fifths'] = 3./5
crises['four fifths'] = 4./5

crises['five sixths'] = 5./6

crises['seventh'] = 1./7
crises['two sevenths'] = 2./7
crises['three sevenths'] = 3./7
crises['four sevenths'] = 4./7
crises['five sevenths'] = 5./7
crises['six sevenths'] = 6./7

# Iterate through list by earliest to latest
print("\nList of your Life crises:")
for (name,val) in sorted(crises.items(), key=lambda k: k[1]):
  # print(key,val)
  crisis_date = birthday + timedelta(days=val*lifespan*365.25)
  print("%s-life crisis: %s" % 
    (name, crisis_date.strftime("%b %d, %Y %H:%M:%S")))
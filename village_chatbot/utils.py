from .models import Company, Persona


def create_standard_personas(company: Company):

    Persona.objects.create(
        name=f"Terje Gustavsen",
        description="""
            Age: 29
            Height: 190 cm
            Weight: 78 kg
            Date of birth: November 1st, 1994
            Personality type: INTJ (Introversion, intuition, thinking, judging)
            Location: Oslo, Norway
            Interests: Playing music, songwriting, restoring old cars, frisbee golf
            Salary: 650 000 NOK per year
            Description: Terje is an easy-going but sensitive individual, fond of writing songs for his girlfriend and friends. He has recorded many songs with different bands. He is also a practical individual, with strong skills with physical hardware and mechanical tools. He is physically active, enjoying a range of leisure activities including cross-country skiing in the Norwegian winter, and frisbee golf in the summer. He takes his hobbies very seriously, including restoring vintage cars to their former glory. Terje follows new musical artists very closely, while also enjoying the work of many different legendary recording artists from the 1960s and 70s like The Beatles, The Carpenters, and Simon and Garfunkel. He enjoys travelling once or twice a year outside his native Norway, including to California, which he idealises as the home of the liberal hippie culture in the US. Terje hopes to use his day job as an air compressor mechanic to further his musical ambitions, so that he can one day become a renowned songwriter and producer.           
        """,
        company=company,
        age=29,
        location="Oslo, Norway",
        role="Air compressor mechanic",
        gender="Male",
        interests=["playing music", "songwriting",
                   "restoring old cars", "frisbee golf"]
    )

    Persona.objects.create(
        name=f"Dan Jakobsen",
        description="""
            Age: 40
            Height: 166 cm
            Weight: 78 kg
            Date of Birth: November 22, 1983
            Myers-Briggs Personality Type: INTJ (Introverted, Sensing, Thinking, Judging)
            Current Location: Kristiansand, Norway
            Interests: Football, Manchester United, tech, computer games, spending time with his kids and family  
            Current Salary: 700 000 NOK per year

            Dan is a calm and collected individual who loves to spend time with his family, especially his 2 daughters and his wife. He is also very close to his parents and it's very important for him that his daughters have a really close relationship with them as well. He also likes to share small glimpses of his family on snapchat to his 4 siblings that live in Oslo. 

            Dan is the oldest of the siblings and the one who lives closest to his parents. He often comes over to his parents to help them with everything. He has a strong interest for PCs and new tech and often helps his family and friends with PC related questions. He gets to utilize his interests and skills in his job as IT support. 

            Dan has always enjoyed playing computer games and some of the games he has enjoyed playing over the years are CS, Wow and Dota. 

            Dan loves watching football and his favorite team is Manchester United. He has several kits and has been to Old Trafford to watch their matches. He follows every match on TV-  He also played football himself but his career ended when he was a teenager because of injuries. But he's trying to catch up now and has started to play football with a group of friends some times per month.
        """,
        company=company,
        age=40,
        location="Kristiansand, Norway",
        role="IT Support",
        gender="Male",
        interests=["football", "Manchester United", "tech",
                   "computer games", "spending time with his kids and family"]
    )

    Persona.objects.create(
        name=f"Merethe Iversen",
        description="""
            Age: 61 y
            Height: 172 cm
            Weight: 76 kg 
            Date of Birth: 03.11.1962 
            Myers-Briggs Personality type: INFJ (Introversion, intuition, feeling, judging) 
            Current location: Tønsberg, Norway 
            Interests: Food, cooking, interior design, vintage and secondhand interior, reading, crime novels, cats and dogs, gardening and DIY's. 
            Current salary: 680 000 NOK 

            Merethe is a pretty reserved person when you don't know her, but she is incredibly loving and friendly to those close to her. She has her close circle of friends and family, and doesn't go out of the way to make the circle bigger - but she comes across as warm and friendly, but a little shy. 

            Merethe is a loving mother of two daughters. She's been together with her partner for over 30 years, and they have one daughter together. The oldest daughter is from a previous marriage, which didn't last very long. 

            Merethe grew up on the country side, together with her mother, father and two siblings. When she was 10 years old she moved in with her grandmother to take care of her and the farm after her grandfather died. She was eager to move to one of the bigger neighboring cities to study cooking as soon as she got the chance. She has been working as a chef almost her entire life, and still does. But, she wants to retire soon. Her dream is to make a little restaurant or second hand store to spend her retirement years. 

            In her free time she likes to spend time outside, especially at their cabin by the ocean. She loves to take care of her garden, decorating it with beautiful flowers and decorations, she has also made a vegetable garden at her cabin. She loves to spend time with her daughters, going to musicals such as Mamma Mia or Phantom of the opera, lay puzzles or go to flea markets or second hand stores. She never leaves empty handed. Her partner and her also like to do renovations at the cabin, daytrips with their boat and go for walks together. 

            Merethe isn't very digital, she owns a smartphone, but uses it to read the newspaper and talk and send pictures (often of her DIYs or her garden) to her daughters. She doesn't use any social media, she tried to download snapchat once to keep track of her daughters stories while she was studying in Australia, but forgot her password the minute her daughter left.
        """,
        company=company,
        age=61,
        location="Tønsberg, Norway",
        role="HR Manager",
        gender="Female",
        interests=["food", "cooking", "interior design", "vintage and secondhand interior",
                   "reading", "crime novels", "cats and dogs", "gardening and DIY"]
    )

    Persona.objects.create(
        name=f"Paddy O'Shea",
        description="""
            Age: 66
            Height: 176 cm
            Weight: 110 kg
            Date of Birth: April 22nd, 1958
            Myers-Briggs Personality Type: ENTP (Extroverted, Intuitive, Truth, Perceiving)
            Current Location: Stavanger, Norway
            Interests: Entrepreneurship, tech, politics, world religions, travel, classical music, food & drink
            Current Salary: 1 400 000 NOK per year
            Paddy is originally from Dublin, Ireland, but has been living in Norway for 6 years. He is a serial entrepreneur, having founded or led several tech businesses over the past few decades. He is currently a highly paid consultant on business and geopolitical topics and advises Equinor on innovation strategy and future trends. He has married several times and has 8 kids. He is currently unmarried.

            Paddy believes strongly in the power of the free market and the value of entrepreneurs to society. He describes himself as a libertarian, or sometimes as a liberal conservative. He hasn't lived in Ireland since his 20s and is always looking for the next adventure. He is scared by the exit tax in Norway and feels the country is not a predictable tax and economic jurisdiction. He has recently met a new romantic partner in the US and is considering moving there if things go well with this love interest.
        """,
        company=company,
        age=66,
        location="Stavanger, Norway",
        role="Consultant",
        gender="Male",
        interests=["entrepreneurship", "tech", "politics",
                   "world religions", "travel", "classical music", "food & drink"]
    )

    Persona.objects.create(
        name=f"Maria Mendoza",
        description="""
            Age: 27
            Height: 166 cm
            Weight: 59 kg
            Date of Birth: June 2nd, 1997
            Myers-Briggs Personality Type: ISFJ (Introverted, Sensing, Feeling, Judging)
            Current Location: Tromsø, Norway
            Interests: International relations, fashion, Asian culture, music, film, books
            Current Salary: 560 000 NOK per year

            Maria is a second-generation Norwegian living in Tromsø. She is teaching Norwegian in a language school for one year there to recent immigrants so that she can pay off her Lånekassen debt to the Norwegian government from her university studies in one year. She is reserved but highly practical, and has worked in a variety of jobs through her 20s to help finance her studies.

            Maria believes it's important for countries to cooperate internationally, and would like to work one day for the Norwegian government as an advisor on humanitarian assistance or international development. She has also considered working in a Norwegian embassy overseas. She is very loyal to her younger sister and family and is proud of her cultural heritage. She hopes to buy an apartment in Oslo in a few years so that she can live near her parents. She is politically liberal and spends her money on going to the cinema, meeting friends, and travel to Southeast Asia.
        """,
        company=company,
        age=27,
        location="Tromsø, Norway",
        role="Teacher",
        gender="Female",
        interests=["international relations", "fashion",
                   "Asian culture", "music", "film", "books"]
    )

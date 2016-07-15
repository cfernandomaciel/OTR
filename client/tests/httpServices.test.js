describe('httpServices unit tests' , function() {

	var pokedexRequest;
	var $httpBackend;
	
	var mockPokedexRequest;
	var mockPokemonRequest;
	var mockPokemonImageRequest;
	var mocPokemonDescriptionRequest;
	
	

	beforeEach(module('app'));


	 beforeEach(inject(function(_$httpBackend_, _pokedexRequest_, _pokemonRequest_, _pokemonImageRequest_, _pokemonDescriptionRequest_) {
	    $httpBackend = _$httpBackend_;


	    mockPokedexRequest = _pokedexRequest_;
		mockPokemonRequest = _pokemonRequest_;
		mockPokemonImageRequest = _pokemonImageRequest_;
		mocPokemonDescriptionRequest = _pokemonDescriptionRequest_;

	  }));	



	it('mockpokedexRequest service: ', function () {		
		$httpBackend.expectGET('http://pokeapi.co/api/v1/pokedex').respond(200, 'success');
		
		var promise = mockPokedexRequest.get();
		
		$httpBackend.flush();				

		expect(promise.$resolved).toBe(true);		

	});

	it('mockPokemonRequest service: ', function () {		
		$httpBackend.expectGET('http://pokeapi.co/3').respond(200, {pokemonUri: 3});
		
		var promise = mockPokemonRequest.get({pokemonUri: 3});
		
		$httpBackend.flush();				

		expect(promise.$resolved).toBe(true);		
		expect(promise.pokemonUri).toBe(3);		

	});

	it('mockPokemonImageRequest service: ', function () {		
		$httpBackend.expectGET('http://pokeapi.co/3').respond(200, {spriteId: 3});
		
		var promise = mockPokemonImageRequest.get({spriteId: 3});
		
		$httpBackend.flush();				

		expect(promise.$resolved).toBe(true);		
		expect(promise.spriteId).toBe(3);		

	});

	it('mocPokemonDescriptionRequest service: ', function () {		
		$httpBackend.expectGET('http://pokeapi.co/3').respond(200, {descriptionUri: 3});
		
		var promise = mocPokemonDescriptionRequest.get({descriptionUri: 3});
		
		$httpBackend.flush();				

		expect(promise.$resolved).toBe(true);		
		expect(promise.descriptionUri).toBe(3);		

	});


	

});
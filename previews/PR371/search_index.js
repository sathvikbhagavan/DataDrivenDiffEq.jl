var documenterSearchIndex = {"docs":
[{"location":"basis/#Basis","page":"Basis","title":"Basis","text":"","category":"section"},{"location":"basis/","page":"Basis","title":"Basis","text":"Basis","category":"page"},{"location":"basis/#DataDrivenDiffEq.Basis","page":"Basis","title":"DataDrivenDiffEq.Basis","text":"struct Basis{IMPL, CTRLS} <: DataDrivenDiffEq.AbstractBasis\n\nA basis over the states with parameters, independent variable, and possible exogenous controls. It extends an AbstractSystem as defined in ModelingToolkit.jl. f can either be a Julia function which is able to use ModelingToolkit variables or a vector of eqs. It can be called with the typical SciML signature, meaning out of place with f(u,p,t) or in place with f(du, u, p, t). If control inputs are present, it is assumed that no control corresponds to zero for all inputs. The corresponding function calls are f(u,p,t,inputs) and f(du,u,p,t,inputs) and need to be specified fully. \n\nThe optional implicits declare implicit variables in the Basis, meaning variables representing the (measured) target of the system. Right now only supported with the use of ImplicitOptimizers.\n\nIf linear_independent is set to true, a linear independent basis is created from all atom functions in f.\n\nIf simplify_eqs is set to true, simplify is called on f.\n\nAdditional keyworded arguments include name, which can be used to name the basis, and observed for defining observables.\n\nFields\n\neqs\n\n: The equations of the basis\n\nstates\n\n: Dependent (state) variables\n\nctrls\n\n: Control variables\n\nps\n\n: Parameters\n\nobserved\n\n: Observed\n\niv\n\n: Independent variable\n\nimplicit\n\n: Implicit variables of the basis\n\nf\n\n: Internal function representation of the basis\n\nname\n\n: Name of the basis\n\nsystems\n\n: Internal systems\n\nExample\n\nusing ModelingToolkit\nusing DataDrivenDiffEq\n\n@parameters w[1:2] t\n@variables u[1:2](t)\n\nΨ = Basis([u; sin.(w.*u)], u, parameters = p, iv = t)\n\nNote\n\nThe keyword argument eval_expression controls the function creation behavior. eval_expression=true means that eval is used, so normal world-age behavior applies (i.e. the functions cannot be called from the function that generates them). If eval_expression=false, then construction via GeneralizedGenerated.jl is utilized to allow for same world-age evaluation. However, this can cause Julia to segfault on sufficiently large basis functions. By default eval_expression=false.\n\n\n\n\n\n","category":"type"},{"location":"basis/#Generators","page":"Basis","title":"Generators","text":"","category":"section"},{"location":"basis/","page":"Basis","title":"Basis","text":"monomial_basis\npolynomial_basis\nsin_basis\ncos_basis\nfourier_basis\nchebyshev_basis","category":"page"},{"location":"basis/#DataDrivenDiffEq.monomial_basis","page":"Basis","title":"DataDrivenDiffEq.monomial_basis","text":"monomial_basis(x)\nmonomial_basis(x, degree)\n\n\nConstructs an array containing monomial basis in the variables x up to degree c of the form [x₁, x₁^2, ... , x₁^c, x₂, x₂^2, ...].\n\n\n\n\n\n","category":"function"},{"location":"basis/#DataDrivenDiffEq.polynomial_basis","page":"Basis","title":"DataDrivenDiffEq.polynomial_basis","text":"polynomial_basis(x)\npolynomial_basis(x, degree)\n\n\nConstructs an array containing a polynomial basis in the variables x up to degree c of the form [x₁, x₂, x₃, ..., x₁^1 * x₂^(c-1)]. Mixed terms are included.\n\n\n\n\n\n","category":"function"},{"location":"basis/#DataDrivenDiffEq.sin_basis","page":"Basis","title":"DataDrivenDiffEq.sin_basis","text":"sin_basis(x, coefficients)\n\n\nConstructs an array containing a Sine basis in the variables x with coefficients c. If c is an Int returns all coefficients from 1 to c.\n\n\n\n\n\n","category":"function"},{"location":"basis/#DataDrivenDiffEq.cos_basis","page":"Basis","title":"DataDrivenDiffEq.cos_basis","text":"cos_basis(x, coefficients)\n\n\nConstructs an array containing a Cosine basis in the variables x with coefficients c. If c is an Int returns all coefficients from 1 to c.\n\n\n\n\n\n","category":"function"},{"location":"basis/#DataDrivenDiffEq.fourier_basis","page":"Basis","title":"DataDrivenDiffEq.fourier_basis","text":"fourier_basis(x, coefficients)\n\n\nConstructs an array containing a Fourier basis in the variables x with (integer) coefficients c. If c is an Int returns all coefficients from 1 to c.\n\n\n\n\n\n","category":"function"},{"location":"basis/#DataDrivenDiffEq.chebyshev_basis","page":"Basis","title":"DataDrivenDiffEq.chebyshev_basis","text":"chebyshev_basis(x, coefficients)\n\n\nConstructs an array containing a Chebyshev basis in the variables x with coefficients c. If c is an Int returns all coefficients from 1 to c.\n\n\n\n\n\n","category":"function"},{"location":"solvers/common/#solve","page":"Solve","title":"Solve","text":"","category":"section"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"All algorithms have been combined under a single API to match the interface of other SciML packages. Thus, you can simply define a Problem, and then seamlessly switch between solvers. ","category":"page"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"DataDrivenDMD for Koopman based inference\nDataDrivenSparse for sparse regression based inference\nDataDrivenSymbolicRegression for interfacing SymbolicRegression.jl","category":"page"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"All of the above methods return a DataDrivenSolution if not enforced otherwise.","category":"page"},{"location":"solvers/common/#common_options","page":"Solve","title":"Common Options","text":"","category":"section"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"Many of the algorithms implemented directly in DataDrivenDiffEq share common options. These can be passed into the solve call via keyworded arguments and get collected into the CommonOptions struct, which is given below. ","category":"page"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"DataDrivenCommonOptions","category":"page"},{"location":"solvers/common/#DataDrivenDiffEq.DataDrivenCommonOptions","page":"Solve","title":"DataDrivenDiffEq.DataDrivenCommonOptions","text":"struct DataDrivenCommonOptions{T, K}\n\nCommon options for all methods provided via DataDrivenDiffEq. \n\nFields\n\nmaxiters\n\n: Maximum iterations Default: 100\n\nabstol\n\n: Absolute tolerance Default: sqrt(eps())\n\nreltol\n\n: Relative tolerance Default: sqrt(eps())\n\nprogress\n\n: Show a progress meter Default: false\n\nverbose\n\n: Display log - Not implemented right now Default: false\n\ndenoise\n\n: Denoise the data using the optimal threshold method. Default: false\n\nnormalize\n\n: Normalize the data, see DataNormalization Default: DataNormalization()\n\ndata_processing\n\n: Data processing pipeline, see DataProcessing Default: DataProcessing()\n\ndigits\n\n: Significant digits for the parameters - used for rounding. Default = 10 Default: 10\n\neval_expresssion\n\n: Evaluate the expression, see Symbolics.build_function Default: true\n\nkwargs\n\n: Additional kwargs Default: (;)\n\nNote\n\nThe keyword argument eval_expression controls the function creation behavior. eval_expression=true means that eval is used, so normal world-age behavior applies (i.e. the functions cannot be called from the function that generates them). If eval_expression=false, then construction via GeneralizedGenerated.jl is utilized to allow for same world-age evaluation. However, this can cause Julia to segfault on sufficiently large basis functions. By default eval_expression=false.\n\n\n\n\n\n","category":"type"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"info: Info\nThe keyword argument eval_expression controls the function creation behavior. eval_expression=true means that eval is used, so normal world-age behavior applies (i.e. the functions cannot be called from the function that generates them). If eval_expression=false, then construction via GeneralizedGenerated.jl is utilized to allow for same world-age evaluation. However, this can cause Julia to segfault on sufficiently large basis functions. By default eval_expression=false.","category":"page"},{"location":"solvers/common/#Solving-the-Problem","page":"Solve","title":"Solving the Problem","text":"","category":"section"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"After defining a problem, we choose a method to solve it. Depending on the input arguments and the type of problem, the function will return a result derived the algorithm of choice. Different options can be provided, depending on the inference method, for options like rounding, normalization, or the progress bar. A Basis can be used for lifting the measurements.","category":"page"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"# Use a Koopman based inference\nres = solve(problem, DMDSVD(), kwargs...)\n# Use a sparse identification\nres = solve(problem, basis, STLQS(), kwargs...)","category":"page"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"The DataDrivenSolution res contains a result which is the inferred system and a Basis, metrics which is a NamedTuple containing different metrics of the inferred system. These can be accessed via:","category":"page"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"# The inferred system\nsystem = result(res)\n# The metrics\nm = metrics(res)","category":"page"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"Since the inferred system is a parametrized equation, the corresponding parameters can be accessed and returned via","category":"page"},{"location":"solvers/common/","page":"Solve","title":"Solve","text":"# Vector\nps = parameters(res)\n# Parameter map\nps = parameter_map(res)","category":"page"},{"location":"problems/#problem","page":"Problems","title":"Problems","text":"","category":"section"},{"location":"problems/","page":"Problems","title":"Problems","text":"DataDrivenProblem","category":"page"},{"location":"problems/#DataDrivenDiffEq.DataDrivenProblem","page":"Problems","title":"DataDrivenDiffEq.DataDrivenProblem","text":"struct DataDrivenProblem{dType, cType, probType} <: DataDrivenDiffEq.AbstractDataDrivenProblem{dType, cType, probType}\n\nThe DataDrivenProblem defines a general estimation problem given measurements, inputs and (in the near future) observations. Three construction methods are available:\n\nDirectDataDrivenProblem for direct mappings\nDiscreteDataDrivenProblem for time discrete systems\nContinousDataDrivenProblem for systems continuous in time\n\nwhere all are aliases for constructing a problem.\n\nFields\n\nX\n\n: State measurements\n\nt\n\n: Time measurements (optional)\n\nDX\n\n: Differental state measurements (optional); Used for time continuous problems\n\nY\n\n: Output measurements (optional); Used for direct problems\n\nU\n\n: Input measurements (optional); Used for non-autonoumous problems\n\np\n\n: Parameters associated with the problem (optional)\n\nname\n\n: Name of the problem\n\nSignatures\n\nExample\n\nX, DX, t = data...\n\n# Define a discrete time problem\nprob = DiscreteDataDrivenProblem(X)\n\n# Define a continuous time problem without explicit time points\nprob = ContinuousDataDrivenProblem(X, DX)\n\n# Define a continuous time problem without explicit derivatives\nprob = ContinuousDataDrivenProblem(X, t)\n\n# Define a discrete time problem with an input function as a function\ninput_signal(u,p,t) = t^2\nprob = DiscreteDataDrivenProblem(X, t, input_signal)\n\n\n\n\n\n","category":"type"},{"location":"problems/#Defining-a-Problem","page":"Problems","title":"Defining a Problem","text":"","category":"section"},{"location":"problems/","page":"Problems","title":"Problems","text":"Problems of identification, estimation, or inference are defined by data. These data contain at least measurements of the states X, which would be sufficient to describe a [DiscreteDataDrivenProblem](@ref) with unit time steps similar to the first example on dynamic mode decomposition. Of course, we can extend this to include time points t, control signals U or a function describing those u(x,p,t). Additionally, any parameters p known a priori can be included in the problem. In practice, this looks like:","category":"page"},{"location":"problems/","page":"Problems","title":"Problems","text":"problem = DiscreteDataDrivenProblem(X)\nproblem = DiscreteDataDrivenProblem(X, t)\nproblem = DiscreteDataDrivenProblem(X, t, U)\nproblem = DiscreteDataDrivenProblem(X, t, U, p = p)\nproblem = DiscreteDataDrivenProblem(X, t, (x,p,t)->u(x,p,t))","category":"page"},{"location":"problems/","page":"Problems","title":"Problems","text":"Similarly, a ContinuousDataDrivenProblem would need at least measurements and time-derivatives (X and DX) or measurements, time information and a way to derive the time derivatives(X, t and a Collocation method). Again, this can be extended by including a control input as measurements or a function and possible parameters:","category":"page"},{"location":"problems/","page":"Problems","title":"Problems","text":"# Using available data\nproblem = ContinuousDataDrivenProblem(X, DX)\nproblem = ContinuousDataDrivenProblem(X, t, DX)\nproblem = ContinuousDataDrivenProblem(X, t, DX, U, p = p)\nproblem = ContinuousDataDrivenProblem(X, t, DX, (x,p,t)->u(x,p,t))\n\n# Using collocation\nproblem = ContinuousDataDrivenProblem(X, t, InterpolationMethod())\nproblem = ContinuousDataDrivenProblem(X, t, GaussianKernel())\nproblem = ContinuousDataDrivenProblem(X, t, U, InterpolationMethod())\nproblem = ContinuousDataDrivenProblem(X, t, U, GaussianKernel(), p = p)","category":"page"},{"location":"problems/","page":"Problems","title":"Problems","text":"You can also directly use a DESolution as an input to your DataDrivenProblem:","category":"page"},{"location":"problems/","page":"Problems","title":"Problems","text":"problem = DataDrivenProblem(sol; kwargs...)","category":"page"},{"location":"problems/","page":"Problems","title":"Problems","text":"which evaluates the function at the specific timepoints t using the parameters p of the original problem instead of using the interpolation. If you want to use the interpolated data, add the additional keyword use_interpolation = true.","category":"page"},{"location":"problems/","page":"Problems","title":"Problems","text":"An additional type of problem is the DirectDataDrivenProblem, which does not assume any kind of causal relationship. It is defined by X and an observed output Y in addition to the usual arguments:","category":"page"},{"location":"problems/","page":"Problems","title":"Problems","text":"problem = DirectDataDrivenProblem(X, Y)\nproblem = DirectDataDrivenProblem(X, t, Y)\nproblem = DirectDataDrivenProblem(X, t, Y, U)\nproblem = DirectDataDrivenProblem(X, t, Y, p = p)\nproblem = DirectDataDrivenProblem(X, t, Y, (x,p,t)->u(x,p,t), p = p)","category":"page"},{"location":"problems/#Concrete-Types","page":"Problems","title":"Concrete Types","text":"","category":"section"},{"location":"problems/","page":"Problems","title":"Problems","text":"DiscreteDataDrivenProblem\nContinuousDataDrivenProblem\nDirectDataDrivenProblem","category":"page"},{"location":"problems/#DataDrivenDiffEq.DiscreteDataDrivenProblem","page":"Problems","title":"DataDrivenDiffEq.DiscreteDataDrivenProblem","text":"A time discrete DataDrivenProblem useable for problems of the form f(x[i],p,t,u) ↦ x[i+1].\n\nDiscreteDataDrivenProblem(X; kwargs...)\n\n\n\n\n\n\n","category":"function"},{"location":"problems/#DataDrivenDiffEq.ContinuousDataDrivenProblem","page":"Problems","title":"DataDrivenDiffEq.ContinuousDataDrivenProblem","text":"A time continuous DataDrivenProblem useable for problems of the form f(x,p,t,u) ↦ dx/dt.\n\nContinuousDataDrivenProblem(X, DX; kwargs...)\n\n\nAutomatically constructs derivatives via an additional collocation method, which can be either a collocation or an interpolation from DataInterpolations.jl wrapped by an InterpolationMethod.\n\n\n\n\n\n","category":"function"},{"location":"problems/#DataDrivenDiffEq.DirectDataDrivenProblem","page":"Problems","title":"DataDrivenDiffEq.DirectDataDrivenProblem","text":"A direct DataDrivenProblem useable for problems of the form f(x,p,t,u) ↦ y.\n\nDirectDataDrivenProblem(X, Y; kwargs...)\n\n\n\n\n\n\n","category":"function"},{"location":"problems/#dataset","page":"Problems","title":"Datasets","text":"","category":"section"},{"location":"problems/","page":"Problems","title":"Problems","text":"DataDrivenDataset","category":"page"},{"location":"problems/#DataDrivenDiffEq.DataDrivenDataset","page":"Problems","title":"DataDrivenDiffEq.DataDrivenDataset","text":"struct DataDrivenDataset{N, U, C} <: DataDrivenDiffEq.AbstractDataDrivenProblem{N, U, C}\n\nA collection of DataDrivenProblems used to concatenate different trajectories or experiments.\n\nCan be called with either a NTuple of problems or a NamedTuple of NamedTuples.  Similar to the DataDrivenProblem, it has three constructors available:\n\nDirectDataset for direct problems\nDiscreteDataset for discrete problems\nContinuousDataset for continuous problems\n\nFields\n\nname\n\n: Name of the dataset\n\nprobs\n\n: The problems\n\nsizes\n\n: The length of each problem - for internal use\n\nSignatures\n\n\n\n\n\n","category":"type"},{"location":"problems/","page":"Problems","title":"Problems","text":"A DataDrivenDataset collects several DataDrivenProblems of the same type but treads them as union used for system identification. ","category":"page"},{"location":"problems/#Concrete-Types-2","page":"Problems","title":"Concrete Types","text":"","category":"section"},{"location":"problems/","page":"Problems","title":"Problems","text":"DiscreteDataset\nContinuousDataset\nDirectDataset","category":"page"},{"location":"problems/#DataDrivenDiffEq.DiscreteDataset","page":"Problems","title":"DataDrivenDiffEq.DiscreteDataset","text":"A time discrete DataDrivenDataset useable for problems of the form f(x,p,t,u) ↦ x(t+1).\n\nDiscreteDataset(s; name, kwargs...)\n\n\n\n\n\n\n","category":"function"},{"location":"problems/#DataDrivenDiffEq.ContinuousDataset","page":"Problems","title":"DataDrivenDiffEq.ContinuousDataset","text":"A time continuous DataDrivenDataset useable for problems of the form f(x,p,t,u) ↦ dx/dt.\n\nContinuousDataset(s; name, collocation, kwargs...)\n\n\nAutomatically constructs derivatives via an additional collocation method, which can be either a collocation or an interpolation from DataInterpolations.jl wrapped by an InterpolationMethod provided by the collocation keyworded argument.\n\n\n\n\n\n","category":"function"},{"location":"problems/#DataDrivenDiffEq.DirectDataset","page":"Problems","title":"DataDrivenDiffEq.DirectDataset","text":"A direct DataDrivenDataset useable for problems of the form f(x,p,t,u) ↦ y.\n\nDirectDataset(s; name, kwargs...)\n\n\n\n\n\n\n","category":"function"},{"location":"problems/#DataSampler","page":"Problems","title":"DataSampler","text":"","category":"section"},{"location":"problems/","page":"Problems","title":"Problems","text":"DataSampler\nSplit\nBatcher","category":"page"},{"location":"contributions/#Contributions","page":"Contributing","title":"Contributions","text":"","category":"section"},{"location":"contributions/","page":"Contributing","title":"Contributing","text":"Contributions are welcome! To help, please:","category":"page"},{"location":"contributions/","page":"Contributing","title":"Contributing","text":"Open (or solve) an issue\nReview pull requests\nAdapt code to be more efficient\nWrite new optimizers or algorithms\nWrite tutorials or adapt the docs","category":"page"},{"location":"contributions/","page":"Contributing","title":"Contributing","text":"Feel free to write a private message to @AlCap23 for further discussion.","category":"page"},{"location":"citations/#Citing","page":"Citing","title":"Citing","text":"","category":"section"},{"location":"citations/","page":"Citing","title":"Citing","text":"If you are using DataDrivenDiffEq.jl for research, please cite","category":"page"},{"location":"citations/","page":"Citing","title":"Citing","text":"@software{datadrivendiffeq,\n  author       = {JuliusMartensen and\n                  Christopher Rackauckas and others},\n  title        = {DataDrivenDiffEq.jl},\n  month        = jul,\n  year         = 2021,\n  publisher    = {Zenodo},\n  doi          = {10.5281/zenodo.5083412},\n  url          = {https://doi.org/10.5281/zenodo.5083412}\n}","category":"page"},{"location":"citations/","page":"Citing","title":"Citing","text":"If you are using the SymbolicRegression.jl API, please cite","category":"page"},{"location":"citations/","page":"Citing","title":"Citing","text":"@software{pysr,\n  author       = {Miles Cranmer},\n  title        = {PySR: Fast \\& Parallelized Symbolic Regression in Python/Julia},\n  month        = sep,\n  year         = 2020,\n  publisher    = {Zenodo},\n  doi          = {10.5281/zenodo.4041459},\n  url          = {http://doi.org/10.5281/zenodo.4041459}\n}","category":"page"},{"location":"solutions/#Solutions","page":"Solutions","title":"Solutions","text":"","category":"section"},{"location":"solutions/","page":"Solutions","title":"Solutions","text":"DataDrivenSolution","category":"page"},{"location":"solutions/#DataDrivenDiffEq.DataDrivenSolution","page":"Solutions","title":"DataDrivenDiffEq.DataDrivenSolution","text":"struct DataDrivenSolution{T} <: DataDrivenDiffEq.AbstractDataDrivenSolution\n\nThe solution to a DataDrivenProblem derived via a certain algorithm. The solution is represented via an AbstractBasis, which makes it callable.\n\nFields\n\nbasis\n\n: The basis representation of the solution\n\nretcode\n\n: Returncode\n\nalg\n\n: Algorithm\n\nout\n\n: Original output of the solution algorithm\n\nprob\n\n: Problem\n\nresiduals\n\n: Residual sum of squares\n\ndof\n\n: Degrees of freedom\n\nNote\n\nThe L₂ norm error, AIC and coefficient of determinantion get only computed, if eval_expression is set to true or if the solution can be interpreted as a linear regression result.\n\n\n\n\n\n","category":"type"},{"location":"solutions/#Functions","page":"Solutions","title":"Functions","text":"","category":"section"},{"location":"solutions/","page":"Solutions","title":"Solutions","text":"get_problem\nget_basis\nget_algorithm\nget_result\nis_converged","category":"page"},{"location":"solutions/#DataDrivenDiffEq.get_problem","page":"Solutions","title":"DataDrivenDiffEq.get_problem","text":"get_problem(r)\n\n\nReturns the original DataDrivenProblem.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#DataDrivenDiffEq.get_basis","page":"Solutions","title":"DataDrivenDiffEq.get_basis","text":"get_basis(r)\n\n\nReturns the recovered Basis.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#DataDrivenDiffEq.get_algorithm","page":"Solutions","title":"DataDrivenDiffEq.get_algorithm","text":"get_algorithm(r)\n\n\nReturns the algorithm used to derive the solution.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#DataDrivenDiffEq.get_result","page":"Solutions","title":"DataDrivenDiffEq.get_result","text":"get_result(r)\n\n\nReturns the original output of the algorithm.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#DataDrivenDiffEq.is_converged","page":"Solutions","title":"DataDrivenDiffEq.is_converged","text":"is_converged(r)\n\n\nAssert the result of the [DataDrivenSolution] and returns true if successful, false otherwise.\n\n\n\n\n\n","category":"function"},{"location":"solutions/","page":"Solutions","title":"Solutions","text":"Additionally, DataDrivenDiffEq.jl extends the following methods for a DataDrivenSolution.","category":"page"},{"location":"solutions/","page":"Solutions","title":"Solutions","text":"StatsBase.dof\nStatsBase.rss\nStatsBase.nobs\nStatsBase.loglikelihood\nStatsBase.nullloglikelihood\nStatsBase.r2\nStatsBase.summarystats","category":"page"},{"location":"solutions/#StatsAPI.dof","page":"Solutions","title":"StatsAPI.dof","text":"dof(sol)\n\n\nReturns the degrees of freedom of the DataDrivenSolution.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#StatsAPI.rss","page":"Solutions","title":"StatsAPI.rss","text":"rss(sol)\n\n\nReturns the residual sum of squares of the DataDrivenSolution.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#StatsAPI.nobs","page":"Solutions","title":"StatsAPI.nobs","text":"nobs(sol)\n\n\nReturns the number of observations of the DataDrivenSolution.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#StatsAPI.loglikelihood","page":"Solutions","title":"StatsAPI.loglikelihood","text":"loglikelihood(sol)\n\n\nReturns the loglikelihood of the DataDrivenSolution assuming a normal distributed error.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#StatsAPI.nullloglikelihood","page":"Solutions","title":"StatsAPI.nullloglikelihood","text":"nullloglikelihood(sol)\n\n\nReturn the nullloglikelihood of the DataDrivenSolution. This corresponds to a model only fitted with an  intercept and a normal distributed error.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#StatsAPI.r2","page":"Solutions","title":"StatsAPI.r2","text":"r2(sol)\n\n\nReturn the coefficient of determinantion of the DataDrivenSolution. \n\nNote\n\nOnly implements CoxSnell based on the loglikelihood and nullloglikelihood.\n\n\n\n\n\n","category":"function"},{"location":"solutions/#StatsBase.summarystats","page":"Solutions","title":"StatsBase.summarystats","text":"summarystats(sol)\n\n\nReturns the summarystats for each row of the error for the DataDrivenSolution.\n\n\n\n\n\n","category":"function"},{"location":"#DataDrivenDiffEq.jl","page":"Home","title":"DataDrivenDiffEq.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"DataDrivenDiffEq.jl is a package for finding the governing equations of motion automatically from a dataset.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The methods in this package take in data and return the differential equation model which generated the data. A known model is not required as input. These methods can estimate equation-free and equation-based models for discrete and continuous differential equations.","category":"page"},{"location":"","page":"Home","title":"Home","text":"There are two main types of estimation, depending on if you need the result to be human-understandable:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Structural identification - returns a human readable result in symbolic form.\nStructural estimation - returns a function that predicts the derivative and generates a correct time series, but is not necessarily human readable.","category":"page"},{"location":"#Package-Overview","page":"Home","title":"Package Overview","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Currently, the following algorithms for structural estimation and identification are implemented. Please note that all the algorithms have been unified under a single mathematical framework, so the interface might be a little different than what you expect.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Dynamic Mode Decomposition (DMD)\nExtended Dynamic Mode Decomposition\nSparse Identification of Nonlinear Dynamics (SINDy)\nImplicit Sparse Identification of Nonlinear Dynamics","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To use DataDrivenDiffEq.jl, install via:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"DataDrivenDiffEq\")","category":"page"},{"location":"utils/#collocation","page":"Utilities","title":"Collocation","text":"","category":"section"},{"location":"utils/","page":"Utilities","title":"Utilities","text":"InterpolationMethod\ncollocate_data","category":"page"},{"location":"utils/#DataDrivenDiffEq.InterpolationMethod","page":"Utilities","title":"DataDrivenDiffEq.InterpolationMethod","text":"A wrapper for the interpolation methods of DataInterpolations.jl.\n\nWraps the methods in such a way that they are callable as f(u,t) to create and return an interpolation of u over t. The first argument of the constructor always defines the interpolation method, all following arguments will be used in the interpolation.\n\nThe additional keyword crop = false indicates to discard the first and last element of the time series. \n\nExample\n\n# Create the wrapper struct\nitp_method = InterpolationMethod(QuadraticSpline)\n# Create a callable interpolation\nitp = itp_method(u,t)\n# Return u[2]\nitp(t[2])\n\n\n\n\n\n","category":"type"},{"location":"utils/#DataDrivenDiffEq.collocate_data","page":"Utilities","title":"DataDrivenDiffEq.collocate_data","text":"collocate_data(data, tpoints)\ncollocate_data(data, tpoints, kernel; crop, kwargs...)\n\n\nUnified interface for collocation techniques. The input can either be a CollocationKernel (see list below) or a wrapped InterpolationMethod from DataInterpolations.jl.\n\nComputes a non-parametrically smoothed estimate of u' and u given the data, where each column is a snapshot of the timeseries at tpoints[i].\n\nExamples\n\nu′,u,t = collocate_data(data,tpoints,kernel=SigmoidKernel())\nu′,u,t = collocate_data(data,tpoints,tpoints_sample,interp,args...)\nu′,u,t = collocate_data(data,tpoints,interp)\n\nCollocation Kernels\n\nSee this paper for more information.\n\nEpanechnikovKernel\nUniformKernel\nTriangularKernel\nQuarticKernel\nTriweightKernel\nTricubeKernel\nGaussianKernel\nCosineKernel\nLogisticKernel\nSigmoidKernel\nSilvermanKernel\n\nInterpolation Methods\n\nSee DataInterpolations.jl for more information.\n\nConstantInterpolation\nLinearInterpolation\nQuadraticInterpolation\nLagrangeInterpolation\nQuadraticSpline\nCubicSpline\nBSplineInterpolation\nBSplineApprox\nCurvefit\n\n\n\n\n\n","category":"function"}]
}
